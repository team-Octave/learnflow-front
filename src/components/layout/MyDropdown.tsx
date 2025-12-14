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
import { Book, LogOut, PresentationIcon, User } from 'lucide-react';
import { useUserStore } from '@/store/userStore';
import { useRouter } from 'next/navigation';

interface MyDropdownProps {
  user: {
    email: string;
    nickname: string;
  };
}

export default function MyDropdown({ user }: MyDropdownProps) {
  const router = useRouter();
  const logout = useUserStore((state) => state.logout);

  const handleLogout = () => {
    logout();
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
        <DropdownMenuLabel>
          <div>{user.nickname}</div>
          <div className="text-xs text-zinc-400">{user.email}</div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href="/mypage">
            <DropdownMenuItem className="cursor-pointer">
              <User />내 정보
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
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-red-500 hover:text-red-500 cursor-pointer"
          onClick={handleLogout}
        >
          <LogOut className="text-red-500" />
          <span className="text-red-500">로그아웃</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
