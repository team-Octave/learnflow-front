// src/services/auth.service.ts

import { commonFetch, authFetch } from '@/shared/api'; //  authFetch 추가
import { cookies } from 'next/headers';

async function login(user: { email: string; password: string }) {
  const response = await commonFetch(`/api/v1/auth/login`, {
    method: 'POST',
    body: JSON.stringify(user),
  });
  return response.json();
}

async function getUser() {
  const response = await authFetch('/api/v1/users/me', {
    method: 'GET',
  });
  return response.json();
}

async function logout() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('refreshToken');
  const response = await commonFetch('/api/v1/auth/logout', {
    method: 'POST',
    headers: {
      Cookie: `refresh_token=${refreshToken}`,
    },
  });
  return response.json();
}

export { login, getUser, logout };
