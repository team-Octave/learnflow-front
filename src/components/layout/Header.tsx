'use client';

import { Button } from '../ui/button';
import Link from 'next/link';
import { useUserStore } from '@/store/userStore';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const MyDropdown = dynamic(() => import('./MyDropdown'), {
  ssr: false,
  loading: () => (
    <div className="w-10 h-10 rounded-full bg-zinc-800 animate-pulse" />
  ),
});

interface HeaderProps {
  serverLoginCheck: boolean;
}

export default function Header({ serverLoginCheck }: HeaderProps) {
  const { user, isAuthenticated } = useUserStore();

  // 렌더링 전까지 서버로 부터 받은 로그인 여부 상태를 사용하고, 이 후에는 zustand의 로그인 여부 상태를 사용
  // 로그인 상태에서 새로 고침 시 잠깐 로그인 버튼이 보이는 현상 해결 위함
  const [isRendered, setIsRendered] = useState(false);

  // 렌더링이 완료되면 true로 변경
  useEffect(() => {
    setIsRendered(true);
  }, []);

  const showProfileUI = isRendered ? isAuthenticated : serverLoginCheck;

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-900/40 flex justify-between items-center h-16 w-full px-8 bg-zinc-950 backdrop-blur-md supports-backdrop-filter:bg-zinc-950/60">
      <Link href="/" className="flex cursor-pointer">
        <div className="text-white text-2xl font-bold">Learn</div>
        <div className="text-indigo-500 text-2xl font-bold">Flow</div>
      </Link>
      <div>
        {showProfileUI ? (
          <MyDropdown
            user={{
              email: user?.email || '이메일',
              nickname: user?.nickname || '닉네임',
            }}
          />
        ) : (
          <Link href={'/login'}>
            <Button
              variant="ghost"
              className="font-medium cursor-pointer hover:font-semibold"
            >
              로그인
            </Button>
          </Link>
        )}
      </div>
    </header>
  );
}
