'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// 리프레시 토큰으로 엑세스 토큰 재발급 함수
async function reissue() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('refreshToken');
  if (!refreshToken) {
    throw new Error('리프레시 토큰이 없습니다.');
  }
  const accessTokenResponse = await commonFetch(
    `${BASE_URL}/api/v1/auth/reissue`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    },
  );
  const body = await accessTokenResponse.json();
  if (accessTokenResponse.ok) {
    const newAccessToken = body.data.accessToken;
    cookieStore.set('accessToken', newAccessToken);
  } else {
    cookieStore.delete('accessToken');
    cookieStore.delete('refreshToken');
    redirect('/login?message=session_expired');
  }
}

export async function authFetch(
  endpoint: string,
  options: RequestInit = {},
): Promise<Response> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  const headers = new Headers(options.headers || {});
  if (accessToken) {
    headers.set('Authorization', `Bearer ${accessToken}`);
  }

  if (options.body && !(options.body instanceof FormData)) {
    if (!headers.has('Content-Type')) {
      headers.set('Content-Type', 'application/json');
    }
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: headers,
    ...options,
  });

  // 엑세스 토큰 만료시 리프레쉬 토큰으로 엑세스 토큰 재발급
  // 재발급이 되면, 재발급된 토큰으로 다시 요청 / 재발급 실패 시 최종 실패 처리
  if (response.status === 401) {
    try {
      await reissue();
      return await authFetch(endpoint, options);
    } catch (error) {
      return response;
    }
  }

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
