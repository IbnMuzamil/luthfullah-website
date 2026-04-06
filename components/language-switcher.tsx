'use client';

import {useLocale} from 'next-intl';
import {usePathname} from '@/lib/navigation';
import {useCallback} from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {Button} from '@/components/ui/button';
import {Globe} from 'lucide-react';

const LOCALES = ['en', 'ar', 'de'] as const;

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();

  const languages = [
    {code: 'en', label: 'English', flag: '🇺🇸'},
    {code: 'ar', label: 'العربية', flag: '🇸🇦'},
    {code: 'de', label: 'Deutsch', flag: '🇩🇪'},
  ];

  const handleLanguageChange = useCallback((newLocale: string) => {
    if (newLocale === locale) return

    const pathWithoutLocale = pathname.replace(
      new RegExp(`^/(?:${LOCALES.join('|')})(?=/|$)`),
      '',
    ) || '/'

    window.location.href = `/${newLocale}${pathWithoutLocale}`
  }, [locale, pathname])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-2"
        >
          <Globe className="h-4 w-4" />
          <span className="uppercase">{locale}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className={`flex items-center gap-2 cursor-pointer ${
              lang.code === locale ? 'bg-accent' : ''
            }`}
          >
            <span>{lang.flag}</span>
            <span>{lang.label}</span>
            {lang.code === locale && <span className="ml-auto text-xs">✓</span>}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
