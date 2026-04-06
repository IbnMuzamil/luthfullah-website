#!/usr/bin/env node
/*
  i18n sync/check utility
  - --check: fail if non-source locales miss any keys from source locale
  - --sync: add missing keys to non-source locales
  - --auto-translate: when used with --sync, missing string values are machine translated (OpenAI)

  Examples:
  node scripts/i18n-sync.mjs --check
  node scripts/i18n-sync.mjs --sync
  node scripts/i18n-sync.mjs --sync --auto-translate
*/

import fs from 'fs';
import path from 'path';

const args = new Set(process.argv.slice(2));
const isCheck = args.has('--check');
const isSync = args.has('--sync');
const autoTranslate = args.has('--auto-translate');

const sourceArg = process.argv.find((arg) => arg.startsWith('--source='));
const localesArg = process.argv.find((arg) => arg.startsWith('--locales='));

if (!isCheck && !isSync) {
  console.error('Usage: node scripts/i18n-sync.mjs --check | --sync [--auto-translate]');
  process.exit(1);
}

const root = process.cwd();
const messagesDir = path.join(root, 'messages');
const sourceLocale = sourceArg ? sourceArg.split('=')[1] : 'en';

const messageFiles = fs
  .readdirSync(messagesDir)
  .filter((name) => name.endsWith('.json'))
  .map((name) => name.replace(/\.json$/i, ''));

const targetLocales = localesArg
  ? localesArg
      .split('=')[1]
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean)
  : messageFiles.filter((locale) => locale !== sourceLocale);

if (!messageFiles.includes(sourceLocale)) {
  console.error(`Source locale file not found for "${sourceLocale}" in messages directory.`);
  process.exit(1);
}

if (targetLocales.length === 0) {
  console.error('No target locales found. Add locale files in messages/ or pass --locales=de,ar');
  process.exit(1);
}

const sourcePath = path.join(messagesDir, `${sourceLocale}.json`);
const source = readJson(sourcePath);

const typeOfValue = (value) => {
  if (Array.isArray(value)) return 'array';
  if (value === null) return 'null';
  return typeof value;
};

const cloneValue = (value) => JSON.parse(JSON.stringify(value));

async function translateString(text, locale) {
  if (!autoTranslate) return text;

  const apiKey = process.env.OPENAI_API_KEY;
  const model = process.env.I18N_OPENAI_MODEL || 'gpt-4o-mini';

  if (!apiKey) return text;

  const system = [
    'You are a professional software localization engine.',
    'Translate UI copy to the target language.',
    'Preserve placeholders exactly (examples: {count}, {name}, {count, plural,...}).',
    'Return only the translated text, no explanations.',
  ].join(' ');

  const user = `Target locale: ${locale}\nText: ${text}`;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      temperature: 0.1,
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: user },
      ],
    }),
  });

  if (!response.ok) {
    return text;
  }

  const data = await response.json();
  const translated = data?.choices?.[0]?.message?.content?.trim();
  return translated || text;
}

function readJson(filePath) {
  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw);
}

function writeJson(filePath, value) {
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, 'utf-8');
}

function pathToString(parts) {
  return parts
    .map((part) => (typeof part === 'number' ? `[${part}]` : part))
    .join('.');
}

async function mergeFromSource(sourceNode, targetNode, locale, trail, report) {
  const sourceType = typeOfValue(sourceNode);
  const targetType = typeOfValue(targetNode);

  if (targetNode === undefined) {
    report.missing.push(pathToString(trail));
    if (sourceType === 'string') {
      return await translateString(sourceNode, locale);
    }
    if (sourceType === 'array') {
      const arr = [];
      for (let i = 0; i < sourceNode.length; i += 1) {
        arr.push(await mergeFromSource(sourceNode[i], undefined, locale, [...trail, i], report));
      }
      return arr;
    }
    if (sourceType === 'object') {
      const obj = {};
      for (const key of Object.keys(sourceNode)) {
        obj[key] = await mergeFromSource(sourceNode[key], undefined, locale, [...trail, key], report);
      }
      return obj;
    }
    return cloneValue(sourceNode);
  }

  if (sourceType !== targetType) {
    report.typeMismatches.push({
      path: pathToString(trail),
      sourceType,
      targetType,
    });
    return cloneValue(targetNode);
  }

  if (sourceType === 'array') {
    const result = [];
    for (let i = 0; i < sourceNode.length; i += 1) {
      result[i] = await mergeFromSource(sourceNode[i], targetNode[i], locale, [...trail, i], report);
    }
    for (let i = sourceNode.length; i < targetNode.length; i += 1) {
      result[i] = cloneValue(targetNode[i]);
    }
    return result;
  }

  if (sourceType === 'object') {
    const result = {};
    for (const key of Object.keys(sourceNode)) {
      result[key] = await mergeFromSource(sourceNode[key], targetNode[key], locale, [...trail, key], report);
    }
    for (const key of Object.keys(targetNode)) {
      if (!(key in sourceNode)) {
        result[key] = cloneValue(targetNode[key]);
      }
    }
    return result;
  }

  return cloneValue(targetNode);
}

(async () => {
  let hasProblems = false;

  console.log(`Source locale: ${sourceLocale}`);
  console.log(`Target locales: ${targetLocales.join(', ')}`);

  for (const locale of targetLocales) {
    const localePath = path.join(messagesDir, `${locale}.json`);
    const current = readJson(localePath);
    const report = {
      missing: [],
      typeMismatches: [],
    };

    const merged = await mergeFromSource(source, current, locale, [], report);

    if (report.missing.length || report.typeMismatches.length) {
      hasProblems = true;
    }

    if (isSync && report.missing.length) {
      writeJson(localePath, merged);
    }

    console.log(`\n[${locale}]`);
    console.log(`Missing keys: ${report.missing.length}`);
    if (report.missing.length > 0) {
      for (const keyPath of report.missing.slice(0, 20)) {
        console.log(`  - ${keyPath}`);
      }
      if (report.missing.length > 20) {
        console.log(`  ... and ${report.missing.length - 20} more`);
      }
    }

    console.log(`Type mismatches: ${report.typeMismatches.length}`);
    if (report.typeMismatches.length > 0) {
      for (const item of report.typeMismatches.slice(0, 20)) {
        console.log(`  - ${item.path}: source=${item.sourceType} target=${item.targetType}`);
      }
      if (report.typeMismatches.length > 20) {
        console.log(`  ... and ${report.typeMismatches.length - 20} more`);
      }
    }
  }

  if (isCheck && hasProblems) {
    console.error('\ni18n check failed: some locales are missing keys or have schema mismatches.');
    process.exit(1);
  }

  if (isCheck) {
    console.log('\ni18n check passed.');
  } else {
    console.log('\ni18n sync completed.');
    if (autoTranslate && !process.env.OPENAI_API_KEY) {
      console.log('Auto-translate requested but OPENAI_API_KEY is not set; missing strings used source text fallback.');
    }
  }
})();
