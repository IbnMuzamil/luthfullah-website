import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const DATA_DIR = path.join(process.cwd(), 'data');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Database file paths
const FORMS_DB = path.join(DATA_DIR, 'forms.json');
const SUBMISSIONS_DB = path.join(DATA_DIR, 'submissions.json');
const PAGES_DB = path.join(DATA_DIR, 'pages.json');
const MEDIA_DB = path.join(DATA_DIR, 'media.json');
const PROJECTS_DB = path.join(DATA_DIR, 'projects.json');
const PORTFOLIO_DB = path.join(DATA_DIR, 'portfolio.json');
const CONFIG_DB = path.join(DATA_DIR, 'config.json');
const ORDERS_DB = path.join(DATA_DIR, 'orders.json');

// Initialize databases if they don't exist
const initializeDB = () => {
  if (!fs.existsSync(FORMS_DB)) fs.writeFileSync(FORMS_DB, JSON.stringify([], null, 2));
  if (!fs.existsSync(SUBMISSIONS_DB)) fs.writeFileSync(SUBMISSIONS_DB, JSON.stringify([], null, 2));
  if (!fs.existsSync(MEDIA_DB)) fs.writeFileSync(MEDIA_DB, JSON.stringify([], null, 2));
  if (!fs.existsSync(PROJECTS_DB)) fs.writeFileSync(PROJECTS_DB, JSON.stringify([], null, 2));
  if (!fs.existsSync(PORTFOLIO_DB)) fs.writeFileSync(PORTFOLIO_DB, JSON.stringify([], null, 2));
  if (!fs.existsSync(ORDERS_DB)) fs.writeFileSync(ORDERS_DB, JSON.stringify([], null, 2));
  
  // Note: PAGES_DB and CONFIG_DB are assumed to be initialized by the setup scripts or existing content
};

initializeDB();

// Helper for atomic writes
const saveToFile = (filePath: string, data: any) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// Forms
export const forms = {
  getAll: () => JSON.parse(fs.readFileSync(FORMS_DB, 'utf-8')),
  create: (form: any) => {
    const all = forms.getAll();
    const item = { ...form, id: uuidv4(), createdAt: new Date().toISOString() };
    all.push(item);
    saveToFile(FORMS_DB, all);
    return item;
  },
  update: (id: string, updates: any) => {
    const all = forms.getAll();
    const idx = all.findIndex((f: any) => f.id === id);
    if (idx === -1) throw new Error('Not found');
    all[idx] = { ...all[idx], ...updates, updatedAt: new Date().toISOString() };
    saveToFile(FORMS_DB, all);
    return all[idx];
  },
  delete: (id: string) => {
    saveToFile(FORMS_DB, forms.getAll().filter((f: any) => f.id !== id));
  }
};

// Submissions
export const submissions = {
  getAll: (formId?: string) => {
    const all = JSON.parse(fs.readFileSync(SUBMISSIONS_DB, 'utf-8'));
    return formId ? all.filter((s: any) => s.formId === formId) : all;
  },
  create: (submission: any) => {
    const all = submissions.getAll();
    const item = { ...submission, id: uuidv4(), submittedAt: new Date().toISOString() };
    all.push(item);
    saveToFile(SUBMISSIONS_DB, all);
    return item;
  },
  delete: (id: string) => {
    saveToFile(SUBMISSIONS_DB, submissions.getAll().filter((s: any) => s.id !== id));
  }
};

// Pages (Object-based for easy slug access)
export const pages = {
  getAll: () => JSON.parse(fs.readFileSync(PAGES_DB, 'utf-8')),
  updateAll: (allPages: any) => {
    saveToFile(PAGES_DB, allPages);
    return allPages;
  },
  getPage: (slug: string) => {
    const all = pages.getAll();
    return all[slug];
  },
  get: (slug: string) => {
    const all = pages.getAll();
    return all[slug];
  },
  updatePage: (slug: string, content: any) => {
    const all = pages.getAll();
    all[slug] = content;
    saveToFile(PAGES_DB, all);
    return all[slug];
  }
};

// Media
export const media = {
  getAll: () => JSON.parse(fs.readFileSync(MEDIA_DB, 'utf-8')),
  create: (mediaItem: any) => {
    const all = media.getAll();
    const item = { ...mediaItem, id: uuidv4(), uploadedAt: new Date().toISOString() };
    all.push(item);
    saveToFile(MEDIA_DB, all);
    return item;
  },
  delete: (id: string) => {
    saveToFile(MEDIA_DB, media.getAll().filter((m: any) => m.id === id ? false : m.id !== id && m.filename !== id));
  }
};

// Projects
export const projects = {
  getAll: () => JSON.parse(fs.readFileSync(PROJECTS_DB, 'utf-8')),
  create: (project: any) => {
    const all = projects.getAll();
    const item = { ...project, id: uuidv4(), createdAt: new Date().toISOString() };
    all.push(item);
    saveToFile(PROJECTS_DB, all);
    return item;
  },
  update: (id: string, updates: any) => {
    const all = projects.getAll();
    const idx = all.findIndex((p: any) => p.id === id);
    if (idx === -1) throw new Error('Not found');
    all[idx] = { ...all[idx], ...updates, updatedAt: new Date().toISOString() };
    saveToFile(PROJECTS_DB, all);
    return all[idx];
  },
  delete: (id: string) => {
    saveToFile(PROJECTS_DB, projects.getAll().filter((p: any) => p.id !== id));
  }
};

// Portfolio
export const portfolio = {
  getAll: () => JSON.parse(fs.readFileSync(PORTFOLIO_DB, 'utf-8')),
  getById: (id: string) => portfolio.getAll().find((item: any) => item.id === id),
  create: (item: any) => {
    const all = portfolio.getAll();
    const newItem = { ...item, id: uuidv4(), createdAt: new Date().toISOString(), status: item.status || 'completed' };
    all.push(newItem);
    saveToFile(PORTFOLIO_DB, all);
    return newItem;
  },
  update: (id: string, updates: any) => {
    const all = portfolio.getAll();
    const idx = all.findIndex((item: any) => item.id === id);
    if (idx === -1) throw new Error('Not found');
    all[idx] = { ...all[idx], ...updates, updatedAt: new Date().toISOString() };
    saveToFile(PORTFOLIO_DB, all);
    return all[idx];
  },
  delete: (id: string) => {
    saveToFile(PORTFOLIO_DB, portfolio.getAll().filter((item: any) => item.id !== id));
  }
};

// Orders
export const orders = {
  getAll: () => JSON.parse(fs.readFileSync(ORDERS_DB, 'utf-8')),
  getById: (id: string) => orders.getAll().find((order: any) => order.id === id),
  getByPaymentSessionId: (paymentSessionId: string) =>
    orders.getAll().find((order: any) => order.paymentSessionId === paymentSessionId),
  create: (order: any) => {
    const all = orders.getAll();
    const item = {
      ...order,
      id: uuidv4(),
      status: order.status || 'pending',
      createdAt: new Date().toISOString(),
    };
    all.push(item);
    saveToFile(ORDERS_DB, all);
    return item;
  },
  update: (id: string, updates: any) => {
    const all = orders.getAll();
    const idx = all.findIndex((o: any) => o.id === id);
    if (idx === -1) throw new Error('Not found');
    all[idx] = { ...all[idx], ...updates, updatedAt: new Date().toISOString() };
    saveToFile(ORDERS_DB, all);
    return all[idx];
  },
  delete: (id: string) => {
    saveToFile(ORDERS_DB, orders.getAll().filter((o: any) => o.id !== id));
  }
};

// Config
export const config = {
  get: () => JSON.parse(fs.readFileSync(CONFIG_DB, 'utf-8')),
  update: (updates: any) => {
    const current = config.get();
    const updated = { ...current, ...updates };
    saveToFile(CONFIG_DB, updated);
    return updated;
  }
};

// Legacy support (to avoid breaking existing routes immediately)
export const getPages = pages.getAll;
export const getProjects = projects.getAll;
export const getConfig = config.get;
export const getForms = forms.getAll;
export const getSubmissions = submissions.getAll;
export const getMedia = media.getAll;
