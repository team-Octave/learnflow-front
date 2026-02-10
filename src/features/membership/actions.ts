// src/features/membership/actions.ts

'use server';

import type { ActionState } from '@/shared/types/ActionState';
import type { PaymentHistoryResponse } from './types';
import { getPaymentHistory } from '@/services/membership.service';

// 결제 내역
export async function getPaymentHistoryAction(): Promise<
  ActionState<PaymentHistoryResponse[]>
> {
  // TODO: 실제 API 연동 시 여기에서 fetch/authFetch 호출
  const state = await getPaymentHistory();
  return state;
}
