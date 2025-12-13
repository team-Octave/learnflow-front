// src/app/(main)/mypage/page.tsx
import AccountDelete from '@/features/user/components/AccountDelete';
import ProfileInfo from '@/features/user/components/ProfileInfo';
import { getMe } from '@/services/auth.service';
import { redirect } from 'next/navigation';

interface Me {
  nickname: string;
  email: string;
  role: 'MEMBER' | 'ADMIN';
}

export default async function MyPage() {
  let me: Me;

  try {
    me = await getMe();
  } catch (e) {
    redirect('/login');
  }

  return (
    <div className="w-full flex justify-center my-12">
      <div className="w-full max-w-[520px] flex flex-col items-center">
        <h1 className="text-2xl font-bold text-white mb-8 w-full px-2">
          내 정보
        </h1>

        <div className="w-full mb-6">
          <ProfileInfo nickname={me.nickname} email={me.email} />
        </div>

        <div className="w-full">
          <AccountDelete email={me.email} />
        </div>
      </div>
    </div>
  );
}
