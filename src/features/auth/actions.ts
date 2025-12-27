// src/features/auth/actions.ts
'use server';

import { getUser, login } from '@/services/auth.service';
import { cookies } from 'next/headers';
import { ActionState } from '@/shared/types/ActionState';

export async function loginAction(
  email: string,
  password: string,
): Promise<ActionState<any>> {
  const payload = { email, password };
  const state = await login(payload);

  // 쿠키에 토큰 세팅
  const cookieStore = await cookies();
  cookieStore.set('accessToken', state.accessToken, {
    httpOnly: true, // 자바스크립트 접근 불가
    maxAge: 60 * 60, // 1시간
    path: '/',
  });
  cookieStore.set('refreshToken', state.refreshToken, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60, //7일
    path: '/',
  });

  return state;
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete('accessToken');
  cookieStore.delete('refreshToken');
}

export async function getUserAction(): Promise<ActionState<any>> {
  const state = await getUser();
  return state;
}
