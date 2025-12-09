import AccountDeleteButton from './AccountDeleteButton';

export default function AccountDelete() {
  return (
    <section
      className="
        w-full max-w-[480px]
        mt-8
        rounded-xl
        border border-red-800/70
        bg-red-950/40
        px-6 py-5
        text-white
      "
    >
      {/* 제목 + 설명 */}
      <h2 className="text-base font-bold text-red-500">회원 탈퇴</h2>

      <p className="mt-2 text-sm leading-relaxed text-red-200/80">
        회원 탈퇴하면 모든 데이터가 영구적으로 삭제됩니다. 이 작업은 되돌릴 수
        없습니다.
      </p>

      {/* 버튼을 오른쪽 아래로 */}
      <div className="mt-6 flex justify-end">
        <AccountDeleteButton email="chulsoo@example.com" />
      </div>
    </section>
  );
}
