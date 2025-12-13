// src/lib/api.ts

'use server'; //이 파일의 함수들은 무조건 서버에서만 실행

import { cookies } from 'next/headers';

// 백엔드 API 서버 주소
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// reissue() – 엑세스 토큰 재발급 함수 (accessToken이 만료됐을 때 refreshToken으로 새 accessToken을 발급)
async function reissue() {
  // 3-1. 쿠키에서 refreshToken 가져오기
  const cookieStore = await cookies(); //JS에서 직접 접근 불가 → 서버에서만 읽을 수 있음
  // const refreshToken = cookieStore.get('refreshToken'); //로그인 시 저장해둔 httpOnly refreshToken
  const refreshToken = cookieStore.get('refreshToken')?.value;

  // 3-2. 재발급 API 호출 commonFetch
  const accessTokenResponse = await commonFetch(
    `${BASE_URL}/api/v1/auth/reissue`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${refreshToken}`, //refreshToken을 Authorization 헤더로 전달
      },
    },
  );

  const body = await accessTokenResponse.json();

  // 3-3. 재발급 성공 시
  if (accessTokenResponse.ok) {
    const newAccessToken = body.data.accessToken; //새 accessToken을 다시 쿠키에 저장
    cookieStore.set('accessToken', newAccessToken); //이후 요청부터 자동으로 사용됨
  } else {
    //3-4. 실패 시
    throw new Error(body.message); //refreshToken 만료 / 위조 / 로그아웃 상태
  }
}

//  authFetch -로그인 필요한 API용 fetch
export async function authFetch(
  endpoint: string,
  options: RequestInit = {},
): Promise<Response> {
  const cookieStore = await cookies();

  // 4-1. accessToken 읽기
  // 서버 쿠키에서 accessToken 가져옴, 없으면 Authorization 헤더 없이 요청
  const accessToken = cookieStore.get('accessToken')?.value;

  // 요청 헤더 구성
  const headers = {
    'Content-Type': 'application/json',
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }), //accessToken이 있을 때만 Authorization 추가
    ...options.headers, //호출하는 쪽에서 headers를 덮어쓸 수도 있게 병합 처리
  };

  // 4-3. 실제 API 요청
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    //일반 API 호출과 동일
    headers: headers,
    ...options,
  });

  // 4-4. 🚨 401 발생 시 (핵심)
  // 엑세스 토큰 만료시 리프레쉬 토큰으로 엑세스 토큰 재발급
  if (response.status === 401) {
    try {
      await reissue(); // 재발급이 되면,
      return await authFetch(endpoint, options); // 재발급된 토큰으로 다시 요청
    } catch (error) {
      //재발급 실패 시
      return response; //refreshToken도 만료 , 최종적으로 401 그대로 반환
    }
  }

  return response;
}

// 인증 필요 없는 commonFetch
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
