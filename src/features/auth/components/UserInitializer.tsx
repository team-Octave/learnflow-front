'use client';

import { useRef } from 'react';
import { useUserStore } from '@/store/userStore';
import { User } from '../types';

export default function UserInitializer({
  user,
}: {
  user: Pick<User, 'email' | 'nickname' | 'role'>;
}) {
  const initialized = useRef(false);

  // 새로고침 시에만 zustand에 값을 로드
  if (!initialized.current) {
    // 이렇게 바로 사용 가능
    useUserStore.getState().setUser(user);
    initialized.current = true;
  }

  return null;
}
