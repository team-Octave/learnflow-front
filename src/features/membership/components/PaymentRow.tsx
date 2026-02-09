// src/features/membership/components/PaymentRow.tsx

import { TableCell, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import type { PaymentHistoryResponse, PaymentStatus } from '../types';
import { formatDateTime } from '@/shared/utils';

interface PaymentRowProps {
  payment: PaymentHistoryResponse;
}

const statusLabel: Record<PaymentStatus, string> = {
  DONE: '결제 완료',
  CANCELED: '결제 취소',
  ABORTED: '결제 실패',
};

const statusVariant: Record<
  PaymentStatus,
  'paymentDone' | 'paymentCanceled' | 'paymentAborted'
> = {
  DONE: 'paymentDone',
  CANCELED: 'paymentCanceled',
  ABORTED: 'paymentAborted',
};

export default function PaymentRow({ payment }: PaymentRowProps) {
  // "2026년 3월 7일"
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
