import { Button } from '../ui/button';
import Link from 'next/link';
import MyDropdown from './MyDropdown';

export default async function Header() {
  // 로그인 여부를 쿠키 값을 보고 알 수 있음!
  // 아직 쿠키 세팅이 안됐으므로 우선 주석 처리
  // const cookieStore = await cookies();
  // const accessToken = cookieStore.get('accessToken');
  // const isLoggined = accessToken ? true : false;

  // 임시 유저 변수
  const user = {
    nickname: '김철수',
    userEmail: 'test@test.com',
  };

  // 임시로 확인용 변수
  const isLoggined = true;

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-900/40 flex justify-between items-center h-16 w-full px-8 bg-zinc-950 backdrop-blur-md supports-backdrop-filter:bg-zinc-950/60">
      <Link href="/" className="flex cursor-pointer">
        <div className="text-white text-2xl font-bold">Learn</div>
        <div className="text-indigo-500 text-2xl font-bold">Flow</div>
      </Link>
      <div>
        {isLoggined ? (
          <MyDropdown user={user} />
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
