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
  return response.json();
}

async function getUser(): Promise<Pick<User, 'email' | 'nickname' | 'role'>> {
  const response = await authFetch('/api/v1/users/me', {
    method: 'GET',
  });
  return response.json();
}

// async function logout() {}

export { login, getUser };
