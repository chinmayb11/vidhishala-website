import { promises as fs } from 'fs';
import path from 'path';
import { contentData, type PageContent } from '@/lib/content-data';

const noStore = () => undefined;

type StoredPage = {
  slug: string;
  content: PageContent;
  is_published?: boolean;
};

const dataFile = path.join(process.cwd(), 'data', 'admin-data.json');

export async function getAdminRows<T = Record<string, unknown>>(table: string): Promise<T[]> {
  noStore();
  try {
    const database = JSON.parse(await fs.readFile(dataFile, 'utf8')) as Record<string, T[]>;
    return database[table] || [];
  } catch {
    return [];
  }
}

async function readStoredPages(): Promise<StoredPage[]> {
  return getAdminRows<StoredPage>('page_content');
}

export async function getPageContent(slug: string): Promise<PageContent> {
  noStore();
  const fallback = contentData[slug];
  const stored = (await readStoredPages()).find((page) => page.slug === slug && page.is_published !== false);
  return stored?.content || fallback || contentData.organisation;
}