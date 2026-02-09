// src/app/(main)/mypage/membership/page.tsx

import { getPaymentHistoryAction } from '@/features/membership/actions';
import { getUserAction } from '@/features/auth/actions';

import MembershipInfo from '@/features/membership/components/MembershipInfo';
import PaymentHistory from '@/features/membership/components/PaymentHistory';

import type {
  MembershipInfoResponse,
  PaymentHistoryResponse,
} from '@/features/membership/types';

export default async function MembershipPage() {
  const [userState, paymentState] = await Promise.all([
    getUserAction(),
    getPaymentHistoryAction(),
  ]);

  //  success라도 data?: any 일 수 있으니 null로 보정
  const user = userState.success ? (userState.data ?? null) : null;

  //  membershipExpiryDate가 있을 때만 date 필드 주입
  const membershipData: MembershipInfoResponse | null = user?.isMembershipActive
    ? {
        planType: '프리미엄', // UI용 mock (나중에 API 연결되면 교체)
        nextBillingAmount: 9900,
        ...(user.membershipExpiryDate
          ? {
              nextBillingDate: user.membershipExpiryDate,
              membershipExpiryDate: user.membershipExpiryDate,
            }
          : {}),
      }
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
