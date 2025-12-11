export interface User {
  userId: string;
  email: string;
  nickname: string;
  role: 'MEMBER' | 'ADMIN';
  createdAt: string;
}

export interface AuthState {
  user: Pick<User, 'email' | 'nickname' | 'role'> | null;
  isAuthenticated: boolean;
  isLoading: boolean;
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
