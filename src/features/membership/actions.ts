'use server';

import { ActionState } from '@/shared/types/ActionState';
import { paymentConfirm } from '@/services/membership.service';
import { PaymentInfo } from './types';
import { getPaymentHistory } from '@/services/membership.service';
import type { PaymentHistoryResponse } from './types';

export async function paymentConfirmAction(
  paymentInfo: PaymentInfo,
): Promise<ActionState<any>> {
  const state = await paymentConfirm(paymentInfo);
  return state;
}

// 결제 내역
export async function getPaymentHistoryAction(): Promise<
  ActionState<PaymentHistoryResponse[]>
> {
  // TODO: 실제 API 연동 시 여기에서 fetch/authFetch 호출
  const state = await getPaymentHistory();
  return state;
}
