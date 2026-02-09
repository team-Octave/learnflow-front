// src/app/(main)/mypage/membership/page.tsx

import { getPaymentHistoryAction } from '@/features/membership/actions';
import MembershipInfo from '@/features/membership/components/MembershipInfo';
import PaymentHistory from '@/features/membership/components/PaymentHistory';

export default async function MembershipPage() {
  const state = await getPaymentHistoryAction();
  const data = state.success ? state.data : null;

  return (
    <div className="w-full flex justify-center">
      <div className="w-full flex flex-col items-center">
        <h1 className="text-2xl font-bold text-white mb-8 w-full px-2">
          멤버십 관리
        </h1>

        <div className="w-full flex flex-col gap-6">
          <MembershipInfo data={data} />
          <PaymentHistory data={data} />
        </div>
      </div>
    </div>
  );
}
