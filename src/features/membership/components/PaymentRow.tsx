// src/features/membership/components/PaymentRow.tsx

import { TableCell, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import type { PaymentHistoryResponse, PaymentStatus } from '../types';
import { formatDateTime } from '@/shared/utils';

//**결제 1건(payment 하나)**만 받아서 테이블의 **한 줄(Row)**
interface Props {
  payment: PaymentHistoryResponse;
}

// 결제 상태 → 한글 라벨 매핑s
// Record<K, V>: "키(Key)는 PaymentStatus이고, 값(Value)은 string 객체
// string: 결과값입니다. '결제 완료' 같은 문자열이 올 것임을 명시s
const statusLabel: Record<PaymentStatus, string> = {
  DONE: '결제 완료',
  CANCELED: '결제 취소',
  ABORTED: '결제 실패',
};

// 결제 상태 → Badge 스타일 매핑
// Record<Key, Value>
// Key (PaymentStatus): DONE, CANCELED, ABORTED 중 하나
// Value ('paymentDone' | 'paymentCanceled' | 'paymentAborted'): 값은 반드시 이 세 가지 특정 문자열 중 하나여야만 합니다.
const statusVariant: Record<
  PaymentStatus,
  'paymentDone' | 'paymentCanceled' | 'paymentAborted'
> = {
  DONE: 'paymentDone',
  CANCELED: 'paymentCanceled',
  ABORTED: 'paymentAborted',
};

// 결제 1건을 받아서 렌더링
export default function PaymentRow({ payment }: Props) {
  // 날짜 포맷 가공
  const paymentDateText = formatDateTime(payment.paymentDate).date;

  return (
    <TableRow className="border-zinc-800 hover:bg-zinc-800/30">
      <TableCell className="text-white">{paymentDateText}</TableCell>
      <TableCell className="text-white">{payment.planType} 멤버십</TableCell>
      <TableCell className="text-white">
        {payment.amount.toLocaleString()}원
      </TableCell>
      <TableCell>
        <Badge variant={statusVariant[payment.status]}>
          {statusLabel[payment.status]}
        </Badge>
      </TableCell>
    </TableRow>
  );
}
