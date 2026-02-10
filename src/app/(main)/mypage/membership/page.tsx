// src/app/(main)/mypage/membership/page.tsx

import { notFound } from 'next/navigation';
import { getPaymentHistoryAction } from '@/features/membership/actions';
import { getUserAction } from '@/features/auth/actions';
import MembershipInfo from '@/features/membership/components/MembershipInfo';
import PaymentHistory from '@/features/membership/components/PaymentHistory';

import type { PaymentHistoryResponse } from '@/features/membership/types';

export default async function MembershipPage() {
  const [userState, paymentState] = await Promise.all([
    getUserAction(),
    getPaymentHistoryAction(),
  ]);

  //  실패 처리 로직
  if (!userState.success) {
    console.log(userState.message);
    return notFound();
  }

  // 결제내역은 "페이지 자체"를 막을지, "결제내역만 비우고 진행"할지 선택 가능
  // MyLearningPage 스타일대로라면 notFound()가 깔끔함.
  if (!paymentState.success) {
    console.log(paymentState.message);
    return notFound();
  }

  //  여기부터는 성공이 보장됨
  const userData = userState.data!;

  const paymentData: PaymentHistoryResponse[] = paymentState.data ?? [];

  return (
    <div className="w-full flex justify-center">
      <div className="w-full flex flex-col items-center">
        <h1 className="text-2xl font-bold text-white mb-8 w-full px-2">
          멤버십 관리
        </h1>

        <div className="w-full flex flex-col gap-6">
          <MembershipInfo
            isMembershipActive={userData.isMembershipActive}
            membershipExpiryDate={userData.membershipExpiryDate}
          />
          <PaymentHistory payments={paymentData} />
        </div>
      </div>
    </div>
  );
}
