// src/features/auth/types.ts
export interface User {
  userId: string;
  email: string;
  nickname: string;
  role: 'MEMBER' | 'ADMIN';
  isMembershipActive: boolean;
  membershipExpiryDate: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  nickname: string;
  email: string;
  role: 'MEMBER' | 'ADMIN';
}

export interface LoginResponseWithToken {
  nickname: string;
  email: string;
  role: 'MEMBER' | 'ADMIN';
  accessToken: string;
  refreshToken: string;
}
