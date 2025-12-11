'use server';

import { login } from '@/services/auth.service';
import { cookies } from 'next/headers';
import { LoginRequest, LoginResponse, User } from './types';

type ActionState<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

export async function loginAction(
  email: string,
  password: string,
): Promise<ActionState<LoginResponse>> {
  const payload: LoginRequest = { email, password };
  // auth.service.ts 의 login 함수
  try {
    const body = await login(payload);

    // 쿠키 설정
    const cookieStore = await cookies();

    // 엑세스 토큰 저장
    cookieStore.set('accessToken', body.accessToken, {
      httpOnly: true, // 자바스크립트 접근 불가
      maxAge: 60 * 60, // 1시간
      path: '/',
    });

    // 리프레시 토큰 저장
    cookieStore.set('refreshToken', body.refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60, //7일
      path: '/',
    });
    const result = {
      email: body.email,
      nickname: body.nickname,
      role: body.role,
    };

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
