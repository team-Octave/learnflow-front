'use client';

import { useUserStore } from '@/store/userStore';
import { useEffect, useTransition } from 'react';
import { getUserAction, logoutAction } from '../actions';

// 새로고침 시 다시 유저의 정보를 요청하여, 로그인 상태를 유지하기 위해 사용(최상단 layout.tsx에서 사용)
export default function AuthChecker() {
  const [_, startTransition] = useTransition();
  const { setIsLoading, setUser, clearUser } = useUserStore();

  useEffect(() => {
    setIsLoading(true);
    startTransition(async () => {
      const response = await getUserAction();

      // 실패 시 기존 유저 정보 제거
      if (!response.success) {
        logoutAction(); // 쿠키 제거
        clearUser(); // 기존의 전역 유저 정보 제거
        setIsLoading(false);
      } else {
        // 성공 시 다시 전역에 유저 정보 저장
        setUser(response.data!); // response.data : {email, nickname, role}
        setIsLoading(false);
      }
    });
  }, []);
  return <></>;
}
