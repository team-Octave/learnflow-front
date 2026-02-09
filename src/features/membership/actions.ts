// src/features/membership/actions.ts
'use server';

import type { ActionState } from '@/shared/types/ActionState';
import type { PaymentHistory } from './types';

function toKoreanDate(dateStr: string) {
  // "2026-03-01" -> "2026년 3월 1일"
  const [y, m, d] = dateStr.split('-').map((v) => parseInt(v, 10));
  return `${y}년${m}월${d}일`;
}

export async function getPaymentHistoryAction(): Promise<
  ActionState<PaymentHistory[]>
> {
  return {
    success: true,
    code: 'SUCCESS',
    data: [
      {
        paymentDate: '2026-01-07T11:45:39Z',
        planType: '1개월',
        amount: 9900,
        status: 'DONE',
      },
      {
        paymentDate: '2026-02-07T11:45:39Z',
        planType: '1개월',
        amount: 9900,
        status: 'DONE',
      },
    ],
  };

  // TODO: 실제 API 연동 시 여기에서 fetch/authFetch 호출
  // const state = await getPaymentHistory();
  // return state;
}

export function formatNextBillingText(dateStr?: string, amount?: number) {
  if (!dateStr || !amount) return '';
  return `다음 결제일:${toKoreanDate(dateStr)} (${amount.toLocaleString()}원)`;
}
