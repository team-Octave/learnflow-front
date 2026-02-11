'use client';

import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Book,
  LogOut,
  PresentationIcon,
  ShieldUserIcon,
  UserIcon,
} from 'lucide-react';
import { useUserStore } from '@/store/userStore';
import { useRouter } from 'next/navigation';
import { logoutAction } from '@/features/auth/actions';
import { useTransition } from 'react';
import { User } from '@/features/auth/types';
import { Badge } from '../ui/badge';

interface MyDropdownProps {
  user: User;
}

export default function MyDropdown({ user }: MyDropdownProps) {
  const router = useRouter();
  const { clearUser } = useUserStore();
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      await logoutAction();
    });
    clearUser();
    router.replace('/');
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage alt={user.nickname[0]} />
          <AvatarFallback>{user.nickname[0]}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48 bg-zinc-900" align="end">
        {user.role === 'ADMIN' ? (
          <>
            <DropdownMenuLabel>
              <div>관리자</div>
              <div className="text-xs text-zinc-400">{user.email}</div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link href="/admin/audit">
                <DropdownMenuItem className="cursor-pointer">
                  <ShieldUserIcon />
                  관리자 페이지
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
          </>
        ) : (
          <>
            <DropdownMenuLabel>
              <div className="flex gap-1 items-center">
                <div>{user.nickname}</div>
                {user.isMembershipActive && (
                  <Badge variant={'membership'}>멤버십</Badge>
                )}
              </div>
              <div className="mt-1 text-xs text-zinc-400">{user.email}</div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link href="/mypage">
                <DropdownMenuItem className="cursor-pointer">
                  <UserIcon />
                  마이페이지
                </DropdownMenuItem>
              </Link>
              <Link href="/mylearning">
                <DropdownMenuItem className="cursor-pointer">
                  <Book />내 학습
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link href="/creator">
                <DropdownMenuItem className="cursor-pointer">
                  <PresentationIcon />
                  강의 관리
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
          </>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-red-500 hover:text-red-500 cursor-pointer"
          onClick={handleLogout}
          disabled={isPending}
        >
          <LogOut className="text-red-500" />
          <span className="text-red-500">로그아웃</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
