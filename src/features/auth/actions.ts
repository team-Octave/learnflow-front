// src/features/auth/actions.ts
'use server';

import { getMe, login } from '@/services/auth.service';
import { cookies } from 'next/headers';
import { LoginRequest, LoginResponse, User } from './types';

type ActionState<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

// login() 호출해서 accessToken / refreshToken 쿠키에 저장 OK
export async function loginAction(
  email: string,
  password: string,
): Promise<ActionState<LoginResponse>> {
  //반환값

  // 로그인 요청용 payload 생성
  const payload: LoginRequest = { email, password }; //API 서버에 보낼 로그인 요청 데이터
  // auth.service.ts 의 login 함수
  try {
    // 3️⃣ 로그인 API 호출 (POST /api/v1/auth/login)
    const body = await login(payload);

    // 4️⃣ 쿠키 객체 가져오기 (Next.js 서버)
    const cookieStore = await cookies();

    // 엑세스 토큰 저장 accessToken → 짧은 수명
    cookieStore.set('accessToken', body.accessToken, {
      httpOnly: true, // 자바스크립트 접근 불가
      maxAge: 60 * 60, // 1시간
      path: '/',
    });

    // 리프레시 토큰 저장 refreshToken → 긴 수명
    // 새 accessToken 발급용
    cookieStore.set('refreshToken', body.refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60, //7일
      path: '/',
    });

    // 클라이언트로 내려줄 사용자 정보 정리
    const result = {
      email: body.email,
      nickname: body.nickname,
      role: body.role,
    };

    // 성공 응답 반환
    return { success: true, data: result };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : '로그인 실패',
    };
  }
}

export async function logoutAction(): Promise<ActionState<null>> {
  const cookieStore = await cookies();
  cookieStore.delete('accessToken');
  cookieStore.delete('refreshToken');
  return { success: true };
}

export async function getUserAction(): Promise<ActionState<LoginResponse>> {
  try {
    const me = await getMe(); // { email, nickname, role }
    return { success: true, data: me };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : '유저 정보 조회 실패',
    };
  }
}
