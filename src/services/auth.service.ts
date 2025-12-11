import {
  LoginRequest,
  LoginResponseWithToken,
  User,
} from '@/features/auth/types';
import { commonFetch } from '@/lib/api';

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

// 내 정보 가져오기 (새로고침 시 세션 유지용)
async function getMe(): Promise<Pick<User, 'email' | 'nickname' | 'role'>> {
  // const response = await fetch('/api/me');
  return { email: 'test@test.com', nickname: '홍길동', role: 'MEMBER' };
}

export { login, logout, getMe };
