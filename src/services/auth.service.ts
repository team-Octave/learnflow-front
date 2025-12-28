// src/services/auth.service.ts

import { commonFetch, authFetch } from '@/shared/api'; //  authFetch 추가

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

// async function logout() {}

export { login, getUser };
