import { loginAction, logoutAction } from '@/features/auth/actions';
import { AuthState, LoginRequest } from '@/features/auth/types';
import { getMe } from '@/services/auth.service';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface UserStore extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>; // 앱 시작 시 로그인 여부 체크
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      login: async (email, password) => {
        set({ isLoading: true });
        try {
          // authservice 호출
          const data = await loginAction(email, password);
          if (data.success) {
            set({ user: data.data, isAuthenticated: true, isLoading: false });
          } else {
            throw new Error(data.error);
          }
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      logout: async () => {
        await logoutAction(); // 서버 쿠키 삭제
        set({ user: null, isAuthenticated: false });
      },

      checkAuth: async () => {
        set({ isLoading: true });
        try {
          const user = await getMe();
          set({ user, isAuthenticated: true, isLoading: false });
        } catch (error) {
          set({ user: null, isAuthenticated: false, isLoading: false });
        }
      },
    }),
    {
      name: 'user-storage', // localStorage에 저장될 키 이름
      storage: createJSONStorage(() => localStorage), // 저장소 설정 (기본값 localStorage)
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
