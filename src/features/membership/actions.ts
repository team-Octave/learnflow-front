// src/features/membership/actions.ts

'use server';

import type { ActionState } from '@/shared/types/ActionState';
import type { MembershipInfoResponse, PaymentHistoryResponse } from './types';

// 멤버십 정보
export async function getMembershipInfoAction(): Promise<
  ActionState<MembershipInfoResponse | null>
> {
  // TODO: 실제 API 연동 시 여기에서 fetch/authFetch 호출
  // const state = await getMembershipInfo();
  // return state;

  return {
    success: true,
    code: 'SUCCESS',
    data: {
      nextBillingDate: '2026-03-01',
      nextBillingAmount: 9900,
      membershipExpiryDate: '2026-03-07T11:45:39Z',
    },
  };
}

// 결제 내역
export async function getPaymentHistoryAction(): Promise<
  ActionState<PaymentHistoryResponse[]>
> {
  // TODO: 실제 API 연동 시 여기에서 fetch/authFetch 호출
  // const state = await getPaymentHistory();
  // return state;

  return {
    success: true,
    code: 'SUCCESS',
    data: [
      {
        id: 1,
        paymentDate: '2026-01-07T11:45:39Z',
        planType: '1개월',
        amount: 9900,
        status: 'DONE',
      },
      {
        id: 2,
        paymentDate: '2026-02-07T11:45:39Z',
        planType: '1개월',
        amount: 9900,
        status: 'DONE',
      },
    ],
  };
}
