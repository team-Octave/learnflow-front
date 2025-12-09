import AccountDelete from '@/features/user/components/AccountDelete';
import AccountDeleteButton from '@/features/user/components/AccountDeleteButton';
import ProfileInfo from '@/features/user/components/ProfileInfo';

export default function MyPage() {
  return (
    <div className="w-full flex justify-center pt-24 pb-32">
      <div className="w-full max-w-[480px] flex flex-col items-center">
        {/* 내 정보 제목 */}
        <h1 className="text-3xl font-bold text-white mb-10 text-center">
          내 정보
        </h1>

        {/* 프로필 정보 박스 */}
        <div className="w-full mb-6">
          <ProfileInfo />
        </div>

        {/* 회원 탈퇴 박스 */}
        <div className="w-full">
          <AccountDelete />
        </div>
      </div>
    </div>
  );
}
