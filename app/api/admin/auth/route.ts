import { NextRequest, NextResponse } from 'next/server';
import { createHash } from 'crypto';
import { promises as fs } from 'fs';
import path from 'path';

const SESSION_COOKIE = 'vidhishala_admin_session';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@vidhishala.org';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
const configFile = path.join(process.cwd(), 'data', 'admin-config.json');

async function passwordHash() {
  try {
    const config = JSON.parse(await fs.readFile(configFile, 'utf8')) as { passwordHash?: string };
    return config.passwordHash || createHash('sha256').update(ADMIN_PASSWORD).digest('hex');
  } catch {
    return createHash('sha256').update(ADMIN_PASSWORD).digest('hex');
  }
}

function user() {
  return { email: ADMIN_EMAIL, user_metadata: { full_name: 'Vidhishala Administrator' } };
}

export async function GET(request: NextRequest) {
  if (request.cookies.get(SESSION_COOKIE)?.value !== 'active') {
    return NextResponse.json({ user: null }, { status: 401 });
  }
  return NextResponse.json({ user: user() });
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const submittedHash = createHash('sha256').update(String(body.password || '')).digest('hex');
  if (String(body.email || '').trim().toLowerCase() !== ADMIN_EMAIL.toLowerCase() || submittedHash !== await passwordHash()) {
    return NextResponse.json({ error: 'The email or password is incorrect.' }, { status: 401 });
  }

  const response = NextResponse.json({ user: user() });
  const isHttps = request.headers.get('x-forwarded-proto') === 'https' || request.nextUrl.protocol === 'https:';
  response.cookies.set(SESSION_COOKIE, 'active', {
    httpOnly: true,
    sameSite: 'lax',
    secure: isHttps,
    path: '/',
    maxAge: 60 * 60 * 8,
  });
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE, '', { httpOnly: true, sameSite: 'lax', path: '/', maxAge: 0 });
  return response;
}

export async function PATCH(request: NextRequest) {
  if (request.cookies.get(SESSION_COOKIE)?.value !== 'active') {
    return NextResponse.json({ error: 'You are not signed in.' }, { status: 401 });
  }
  const body = await request.json().catch(() => ({}));
  if (String(body.password || '').length < 10) {
    return NextResponse.json({ error: 'Password must contain at least 10 characters.' }, { status: 400 });
  }
  await fs.mkdir(path.dirname(configFile), { recursive: true });
  await fs.writeFile(configFile, JSON.stringify({ passwordHash: createHash('sha256').update(String(body.password)).digest('hex') }, null, 2), 'utf8');
  return NextResponse.json({ ok: true });
}
