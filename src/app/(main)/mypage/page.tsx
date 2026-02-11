// src/app/(main)/mypage/page.tsx
import { getUserAction } from '@/features/auth/actions';
import AccountDelete from '@/features/user/components/AccountDelete';
import ProfileInfo from '@/features/user/components/ProfileInfo';
import { notFound } from 'next/navigation';

export default async function MyPage() {
  const state = await getUserAction();
  if (!state.success) {
    console.log(state.message);
    return notFound();
  }
  const user = state.data!;

  return (
    <div className="w-full flex justify-center">
      <div className="w-full flex flex-col items-center">
        <h1 className="text-2xl font-bold text-white mb-8 w-full px-2">
          프로필 관리
        </h1>

        <div className="w-full mb-6">
          <ProfileInfo nickname={user.nickname} email={user.email} />
        </div>

        <div className="w-full">
          <AccountDelete email={user.email} />
        </div>
      </div>
    </div>
  );
}
