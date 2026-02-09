// src/features/membership/components/PaymentRow.tsx

import { TableCell, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import type { PaymentHistory } from '../types';

interface PaymentRowProps {
  payment: PaymentHistory;
}

export default function PaymentRow({ payment }: PaymentRowProps) {
  const isCompleted = payment.status === 'DONE';

  return (
    <TableRow className="border-zinc-800 hover:bg-zinc-800/30">
      <TableCell className="text-white">{payment.paymentDate}</TableCell>

      <TableCell className="text-white">{payment.planType}</TableCell>

      <TableCell className="text-white">
        {payment.amount.toLocaleString()}원
      </TableCell>

      <TableCell>
        <Badge
          variant={isCompleted ? 'default' : 'secondary'}
          className={
            isCompleted
              ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
              : 'bg-zinc-500/20 text-zinc-400 border-zinc-500/30'
          }
        >
          {isCompleted ? '결제완료' : '결제취소'}
        </Badge>
      </TableCell>
    </TableRow>
  );
}
