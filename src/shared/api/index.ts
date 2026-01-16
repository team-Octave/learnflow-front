import { cookies } from 'next/headers';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function authFetch(endpoint: string, options: RequestInit = {}) {
  const cookieStore = await cookies();
  let accessToken = cookieStore.get('accessToken')?.value;

  const getHeaders = (token?: string) => {
    const headers = new Headers(options.headers || {});
    if (token) headers.set('Authorization', `Bearer ${token}`);
    if (options.body && !(options.body instanceof FormData)) {
      headers.set('Content-Type', 'application/json');
    }
    return headers;
  };

  let response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: getHeaders(accessToken),
  });
  return response;
}

// 토큰이 필요 없는 Fetch
export async function commonFetch(endpoint: string, options: RequestInit = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: headers,
    ...options,
  });

  return response;
}
