// src/features/auth/actions.ts
'use server';

import { getUser, login } from '@/services/auth.service';
import { cookies } from 'next/headers';
import { ActionState } from '@/shared/types/ActionState';

export async function loginAction(user: {
  email: string;
  password: string;
}): Promise<ActionState<any>> {
  const state = await login(user);

  if (!state.success) {
    return state;
  }

  const cookieStore = await cookies();
  cookieStore.set('accessToken', state.data.accessToken, {
    httpOnly: true, // 자바스크립트 접근 불가
    maxAge: 60 * 60, // 1시간
    secure: true,
    sameSite: 'lax',
    path: '/',
  });
  cookieStore.set('refreshToken', state.data.refreshToken, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60, //7일
    secure: true,
    sameSite: 'lax',
    path: '/',
  });

  const stateWithoutToken = {
    ...state,
    data: {
      email: state.data.email,
      nickname: state.data.nickname,
      role: state.data.role,
    },
  };

  return stateWithoutToken;
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
