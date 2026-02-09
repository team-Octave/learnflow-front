// src/features/membership/components/PaymentRow.tsx

import { TableCell, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import type { PaymentHistoryResponse } from '../types';

interface PaymentRowProps {
  payment: PaymentHistoryResponse;
}

export default function PaymentRow({ payment }: PaymentRowProps) {
  const isDone = payment.status === 'DONE';

  const statusText =
    payment.status === 'DONE'
      ? '결제완료'
      : payment.status === 'CANCELED'
        ? '취소'
        : '실패';

  return (
    <TableRow className="border-zinc-800 hover:bg-zinc-800/30">
      <TableCell className="text-white">{payment.paymentDate}</TableCell>
      <TableCell className="text-white">{payment.planType}</TableCell>
      <TableCell className="text-white">
        {payment.amount.toLocaleString()}원
      </TableCell>
      <TableCell>
        <Badge
          variant={isDone ? 'default' : 'secondary'}
          className={
            isDone
              ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
              : 'bg-zinc-500/20 text-zinc-300 border-zinc-500/30'
          }
        >
          {statusText}
        </Badge>
      </TableCell>
    </TableRow>
  );
}
