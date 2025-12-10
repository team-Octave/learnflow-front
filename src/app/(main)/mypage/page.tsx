import AccountDelete from '@/features/user/components/AccountDelete';
import AccountDeleteButton from '@/features/user/components/AccountDeleteButton';
import ProfileInfo from '@/features/user/components/ProfileInfo';

export default function MyPage() {
  return (
    <div className="w-full flex justify-center my-12">
      <div className="w-full max-w-[520px] flex flex-col items-center">
        {/* 내 정보 제목 */}
        <h1 className="text-2xl font-bold text-white mb-8 w-full px-2">
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
