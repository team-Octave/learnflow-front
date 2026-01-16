// 'use server';
import 'server-only';
import { cookies } from 'next/headers';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

function assertBaseUrl() {
  if (!BASE_URL) {
    throw new Error(
      '[shared/api] NEXT_PUBLIC_API_URL is undefined. Check .env.local',
    );
  }
}

export async function authFetch(endpoint: string, options: RequestInit = {}) {
  assertBaseUrl();
  if (!endpoint) throw new Error('[authFetch] endpoint is empty.');

  let accessToken: string | undefined;

  try {
    const cookieStore = await cookies(); //  await 추가
    accessToken = cookieStore.get('accessToken')?.value;
  } catch (e) {
    console.error('[authFetch] cookies() unavailable', e);
    accessToken = undefined;
  }

  const headers = new Headers(options.headers || {});
  if (accessToken) headers.set('Authorization', `Bearer ${accessToken}`);
  if (options.body && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  return fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
    cache: 'no-store',
  });
}

// 토큰이 필요 없는 Fetch
export async function commonFetch(endpoint: string, options: RequestInit = {}) {
  assertBaseUrl();

  if (!endpoint) {
    throw new Error('[commonFetch] endpoint is empty.');
  }

  const headers = new Headers(options.headers || {});
  headers.set('Content-Type', 'application/json');

  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers,
      cache: 'no-store',
    });
    return res;
  } catch (err) {
    console.error('[commonFetch] fetch failed', {
      baseUrl: BASE_URL,
      endpoint,
      options,
      err,
    });
    throw err;
  }
}
