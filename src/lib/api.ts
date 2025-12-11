'use server';
import { cookies } from 'next/headers';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function authFetch(
  endpoint: string,
  options: RequestInit = {},
): Promise<Response> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  const headers = {
    'Content-Type': 'application/json',
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    ...options.headers,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: headers,
    ...options,
  });

  // 엑세스 토큰 만료시 리프레쉬 토큰으로 엑세스 토큰 재발급
  // 재발급이 되면, 재발급된 토큰으로 다시 요청 / 재발급 실패 시 최종 실패 처리

  return response;
}

export async function commonFetch(
  endpoint: string,
  options: RequestInit = {},
): Promise<Response> {
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
