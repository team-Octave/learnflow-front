// src/features/membership/components/MembershipInfo.tsx

import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { formatDateTime } from '@/shared/utils';

// 멤버십 정보가 있으면 객체, 없으면 null**을 내려주는 구조
interface Props {
  // 현재 유저가 멤버십을 이용 중인지 여부
  isMembershipActive: boolean;
  membershipExpiryDate: string;
}

export default function MembershipInfo({
  isMembershipActive,
  membershipExpiryDate,
}: Props) {
  // 만료일 포맷 처리
  const expiryText = membershipExpiryDate
    ? // 멤버십 만료일이 있으면→ 유틸 함수로 한국 날짜 형식 문자열로 바꾸고
      formatDateTime(membershipExpiryDate).date
    : // → 없으면 그냥 null”
      null;

  return (
    <section className="w-full p-6 rounded-xl bg-zinc-900/40 border border-zinc-700 text-white">
      <h2 className="text-xl font-bold text-white mb-6">멤버십 정보</h2>

      {isMembershipActive ? (
        // “멤버십 데이터가 있으면 → 이용 중 UI
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-zinc-800 pb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-lg font-semibold">프리미엄 멤버십</h3>
                <Badge variant={'membership'}>이용 중</Badge>
              </div>

              {/* expiryText가 있을 때만 렌더링 */}
              {/* &&는 "그리고"라는 뜻이지만, React(JSX) 안에서는 **"앞의 조건이 맞을(True) 때만 뒤의 내용을 보여준다"**는 일종의 스위치 역할 */}
              {expiryText && (
                <div className="text-zinc-500 text-sm">
                  멤버십 만료일 : {expiryText}
                </div>
              )}
            </div>
          </div>

          <div className="text-zinc-500 text-sm">
            * 결제 및 이용 관련 문의는 고객센터를 이용해 주세요.
          </div>
        </div>
      ) : (
        // 없으면 → 멤버십 없음 UI”
        <div className="flex items-start justify-between gap-4">
          <p className="text-zinc-400">이용 중인 멤버십이 없어요.</p>

          <Link href="/payment">
            <button className="px-6 py-3 bg-primary hover:bg-primary/80 cursor-pointer text-white font-medium rounded-lg transition-colors whitespace-nowrap">
              멤버십 시작하기
            </button>
          </Link>
        </div>
      )}
    </section>
  );
}
