import Link from 'next/link';
import { cookies } from 'next/headers';
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
import { Book, LogOut, PresentationIcon, User } from 'lucide-react';

interface MyDropdownProps {
  user: {
    nickname: string;
    userEmail: string;
  };
}

export default function MyDropdown({ user }: MyDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage alt="S" />
          <AvatarFallback>S</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48 bg-zinc-900" align="end">
        <DropdownMenuLabel>
          <div>{user.nickname}</div>
          <div className="text-xs text-zinc-400">{user.userEmail}</div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href="/mypage">
            <DropdownMenuItem>
              <User />내 정보
            </DropdownMenuItem>
          </Link>
          <Link href="/mylearning">
            <DropdownMenuItem>
              <Book />내 학습
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href="/creator">
            <DropdownMenuItem>
              <PresentationIcon />
              강의 관리
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-red-500 hover:text-red-500">
          <LogOut className="text-red-500" />
          <span className="text-red-500">로그아웃</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
