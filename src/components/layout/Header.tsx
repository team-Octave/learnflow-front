'use client';

import Link from 'next/link';
import { Button } from '../ui/button';
import { useUserStore } from '@/store/userStore';
import { User } from '@/features/auth/types';
import dynamic from 'next/dynamic';
import MembershipInduceButton from '@/features/membership/components/MembershipInduceButton';

const MyDropdown = dynamic(() => import('./MyDropdown'), {
  ssr: false,
  loading: () => <div className="w-8 h-8 bg-muted rounded-full"></div>,
});
interface HeaderProps {
  initialUser: User;
}

export default function Header({ initialUser }: HeaderProps) {
  const user = useUserStore((state) => state.user) ?? initialUser;

  const isLoggedIn = user !== null;

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-900/40 flex justify-between items-center h-16 w-full px-8 bg-zinc-950 backdrop-blur-md supports-backdrop-filter:bg-zinc-950/60">
      <Link href="/" className="flex cursor-pointer">
        <div className="text-white text-2xl font-bold">Learn</div>
        <div className="text-indigo-500 text-2xl font-bold">Flow</div>
      </Link>
      <div>
        {isLoggedIn ? (
          <div className="flex gap-4">
            {!user.isMembershipActive && user.role === 'MEMBER' && (
              <MembershipInduceButton />
            )}
            <MyDropdown user={user} />
          </div>
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
