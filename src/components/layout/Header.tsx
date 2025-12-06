import { cookies } from 'next/headers';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import Link from 'next/link';

export default async function Header() {
  // 로그인 여부를 쿠키 값을 보고 알 수 있음!
  // 아직 쿠키 세팅이 안됐으므로 우선 주석 처리
  // const cookieStore = await cookies();
  // const accessToken = cookieStore.get('accessToken');
  // const isLoggined = accessToken ? true : false;

  // 임시로 확인용 변수
  const isLoggined = false;

  return (
    <header className="flex justify-between items-center fixed h-16 w-full px-8 bg-zinc-950">
      <div className="flex cursor-pointer">
        <div className="text-white text-2xl font-bold">Learn</div>
        <div className="text-indigo-500 text-2xl font-bold">Flow</div>
      </div>
      <div>
        {isLoggined ? (
          <Avatar className="cursor-pointer">
            <AvatarImage alt="S" />
            <AvatarFallback>S</AvatarFallback>
          </Avatar>
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
