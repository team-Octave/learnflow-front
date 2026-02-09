// src/features/membership/actions.ts

'use server';

import type { ActionState } from '@/shared/types/ActionState';
import type { PaymentHistoryResponse } from './types';

// 결제 내역
export async function getPaymentHistoryAction(): Promise<
  ActionState<PaymentHistoryResponse[]>
> {
  // TODO: 실제 API 연동 시 여기에서 fetch/authFetch 호출
  // const state = await getPaymentHistory();
  // return state;

  // return {
  //   success: true,
  //   code: 'SUCCESS',
  //   data: [], // 구독권 결제 안 한 상태
  // };

  return {
    success: true,
    code: 'SUCCESS',
    data: [
      {
        id: 1,
        paymentDate: '2026-01-07T11:45:39Z',
        planType: '프리미엄',
        amount: 9900,
        status: 'DONE',
      },
      {
        id: 2,
        paymentDate: '2026-02-07T11:45:39Z',
        planType: '프리미엄',
        amount: 9900,
        status: 'CANCELED',
      },
      {
        id: 3,
        paymentDate: '2026-03-07T11:45:39Z',
        planType: '프리미엄',
        amount: 9900,
        status: 'ABORTED',
      },
    ],
  };
}
