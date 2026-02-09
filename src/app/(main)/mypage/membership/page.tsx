// src/app/(main)/mypage/membership/page.tsx

import {
  getMembershipInfoAction,
  getPaymentHistoryAction,
} from '@/features/membership/actions';

import MembershipInfo from '@/features/membership/components/MembershipInfo';
import PaymentHistory from '@/features/membership/components/PaymentHistory';

import type {
  MembershipInfoResponse,
  PaymentHistoryResponse,
} from '@/features/membership/types';

export default async function MembershipPage() {
  const [membershipState, paymentState] = await Promise.all([
    getMembershipInfoAction(),
    getPaymentHistoryAction(),
  ]);

  // ActionState의 data?: T 때문에 undefined가 섞일 수 있어서 null/[]로 보정
  const membershipData: MembershipInfoResponse | null = membershipState.success
    ? (membershipState.data ?? null)
    : null;

  const paymentData: PaymentHistoryResponse[] = paymentState.success
    ? (paymentState.data ?? [])
    : [];

  return (
    <div className="w-full flex justify-center">
      <div className="w-full flex flex-col items-center">
        <h1 className="text-2xl font-bold text-white mb-8 w-full px-2">
          멤버십 관리
        </h1>

        <div className="w-full flex flex-col gap-6">
          <MembershipInfo data={membershipData} />
          <PaymentHistory data={paymentData} />
        </div>
      </div>
    </div>
  );
}
