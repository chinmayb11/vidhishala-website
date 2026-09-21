import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { contentData } from '@/lib/content-data';

const SESSION_COOKIE = 'vidhishala_admin_session';
const allowedTables = new Set(['events', 'gallery_media', 'gazette_publications', 'internship_applications', 'inquiries', 'team_members', 'page_content']);
const dataFile = path.join(process.cwd(), 'data', 'admin-data.json');

type Row = Record<string, any>;

function defaultPageRows(): Row[] {
  return Object.entries(contentData).map(([key, page]) => ({
    id: key,
    slug: key,
    title: page.title,
    content: page,
    is_published: true,
    created_at: new Date(0).toISOString(),
  }));
}

async function readDatabase() {
  try {
    return JSON.parse(await fs.readFile(dataFile, 'utf8')) as Record<string, Row[]>;
  } catch {
    return {} as Record<string, Row[]>;
  }
}

async function writeDatabase(database: Record<string, Row[]>) {
  await fs.mkdir(path.dirname(dataFile), { recursive: true });
  await fs.writeFile(dataFile, JSON.stringify(database, null, 2), 'utf8');
}

function unauthorized() {
  return NextResponse.json({ data: null, error: { message: 'You are not signed in.' } }, { status: 401 });
}

function tableFrom(request: NextRequest, params: { table: string }) {
  if (!allowedTables.has(params.table)) return null;
  if (request.cookies.get(SESSION_COOKIE)?.value !== 'active') return null;
  return params.table;
}

export async function GET(request: NextRequest, { params }: { params: { table: string } }) {
  const table = tableFrom(request, params);
  if (!table) return request.cookies.get(SESSION_COOKIE)?.value !== 'active' ? unauthorized() : NextResponse.json({ data: [], error: { message: 'Unknown admin table.' } }, { status: 404 });

  const database = await readDatabase();
  let rows = [...(database[table] || [])];
  if (table === 'page_content' && rows.length === 0) {
    rows = defaultPageRows();
  }
  const url = new URL(request.url);
  url.searchParams.forEach((value, key) => {
    if (!['order', 'ascending', 'limit', 'head'].includes(key)) rows = rows.filter((row) => String(row[key] ?? '') === value);
  });
  const order = url.searchParams.get('order');
  if (order) {
    const direction = url.searchParams.get('ascending') === 'false' ? -1 : 1;
    rows.sort((left, right) => String(left[order] ?? '').localeCompare(String(right[order] ?? '')) * direction);
  }
  const count = rows.length;
  const limit = Number(url.searchParams.get('limit'));
  if (limit > 0) rows = rows.slice(0, limit);
  return NextResponse.json({ data: url.searchParams.get('head') === 'true' ? null : rows, error: null, count });
}

export async function POST(request: NextRequest, { params }: { params: { table: string } }) {
  const table = tableFrom(request, params);
  if (!table) return unauthorized();
  const database = await readDatabase();
  const existing = database[table] || [];
  const body = await request.json().catch(() => ({}));
  const entries = (Array.isArray(body) ? body : [body]).map((row) => ({ ...row, id: row.id || crypto.randomUUID(), created_at: row.created_at || new Date().toISOString() }));
  database[table] = [...existing, ...entries];
  await writeDatabase(database);
  return NextResponse.json({ data: entries, error: null });
}

async function mutate(request: NextRequest, params: { table: string }, method: 'PATCH' | 'DELETE') {
  const table = tableFrom(request, params);
  if (!table) return unauthorized();
  const database = await readDatabase();
  const url = new URL(request.url);
  const id = url.searchParams.get('id');
  const storedRows = database[table] || [];
  const rows = storedRows.length > 0 ? storedRows : (table === 'page_content' ? defaultPageRows() : []);
  const matches = (row: Row) => !id || String(row.id) === id;
  if (method === 'PATCH') {
    const body = await request.json().catch(() => ({}));
    database[table] = rows.map((row) => matches(row) ? { ...row, ...body } : row);
  } else {
    database[table] = storedRows.length > 0 ? rows.filter((row) => !matches(row)) : [];
  }
  await writeDatabase(database);
  return NextResponse.json({ data: null, error: null });
}

export async function PATCH(request: NextRequest, context: { params: { table: string } }) {
  return mutate(request, context.params, 'PATCH');
}

export async function DELETE(request: NextRequest, context: { params: { table: string } }) {
  return mutate(request, context.params, 'DELETE');
}
