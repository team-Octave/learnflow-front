import { User } from '@/features/auth/types';
import { create } from 'zustand';

// 전역에 저장할 정보
type UserState = Pick<
  User,
  'email' | 'nickname' | 'role' | 'isMembershipActive' | 'membershipExpiryDate'
> | null;

interface UserStore {
  user: UserState; // 전역으로 관리할 유저 정보(이메일, 닉네임, 역할(MEMBER or ADMIN))
  isLoading: boolean; // API 요청 중에 로딩 중을 확인하기 위한 정보 (true or false)
  setIsLoading: (value: boolean) => void; // 로딩 중 상태 변경 함수
  setUser: (userData: UserState) => void; // 유저를 전역상태에 저장하는 함수(로그인 / 새로고침 시 사용)
  clearUser: () => void; // 로그아웃 시 전역상태에 있는 유저를 제거하는 함수
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  isLoading: false,

  setIsLoading: (value) => set({ isLoading: value }),

  setUser: (userData) => set({ user: userData as UserState }),

  clearUser: () => set({ user: null }),
}));
