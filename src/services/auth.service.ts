// src/services/auth.service.ts

import {
  LoginRequest,
  LoginResponseWithToken,
  User,
} from '@/features/auth/types';
import { commonFetch, authFetch } from '@/shared/api'; //  authFetch 추가

async function login(user: LoginRequest): Promise<LoginResponseWithToken> {
  const response = await commonFetch(`/api/v1/auth/login`, {
    method: 'POST',
    body: JSON.stringify(user),
  });
  const data = await response.json();
  if (response.ok) {
    return data.data as LoginResponseWithToken;
  } else {
    throw new Error(data.message || '로그인 실패');
  }
}

async function logout() {}

async function getMe(): Promise<Pick<User, 'email' | 'nickname' | 'role'>> {
  const response = await authFetch('/api/v1/users/me', {
    method: 'GET',
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || '유저 정보 조회 실패');
  }

  const user = data.data as Pick<User, 'email' | 'nickname' | 'role'>;

  return {
    email: user.email,
    nickname: user.nickname,
    role: user.role,
  };
}
export { login, logout, getMe };
