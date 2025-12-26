'use server';
import { cookies } from 'next/headers';
import { reissue } from './reissue';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// 토큰이 필요한 Fetch 요청
export async function authFetch(endpoint: string, options: RequestInit = {}) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  // 헤더 설정 함수
  const getHeaders = (token?: string) => {
    const headers = new Headers(options.headers || {});
    if (token) headers.set('Authorization', `Bearer ${token}`);
    if (options.body && !(options.body instanceof FormData)) {
      headers.set('Content-Type', 'application/json');
    }
    return headers;
  };

  // 1. 첫 번째 시도
  let response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: getHeaders(accessToken),
  });

  // 2. 401 발생 시 토큰 재발급 후 요청 재시도
  if (response.status === 401 && refreshToken) {
    try {
      const newAccessToken = await reissue(refreshToken); // 재발급 및 쿠키 저장 시도
      cookieStore.set('accessToken', newAccessToken, {
        httpOnly: true,
        path: '/',
        maxAge: 60 * 60,
      });

      // 새로 발급한 토큰으로 재시도
      response = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers: getHeaders(newAccessToken),
      });
    } catch (error) {
      // 재발급도 실패하면 원래의 401 응답을 그대로 반환 (로그아웃 처리용)
      console.error('토큰 재발급/재시도 실패');
    }
  }

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
