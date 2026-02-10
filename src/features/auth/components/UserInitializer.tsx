'use client';

import { useRef } from 'react';
import { useUserStore } from '@/store/userStore';
import { User } from '../types';

export default function UserInitializer({ user }: { user: User }) {
  const initialized = useRef(false);

  // 새로고침 시에만 zustand에 값을 로드
  if (!initialized.current) {
    useUserStore.getState().setUser(user);
    initialized.current = true;
  }

  return null;
}
