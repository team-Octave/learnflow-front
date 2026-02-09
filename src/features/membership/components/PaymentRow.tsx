// src/features/membership/components/PaymentRow.tsx

import { TableCell, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import type { Payment } from '../types';

interface PaymentRowProps {
  payment: Payment;
}

export default function PaymentRow({ payment }: PaymentRowProps) {
  const isCompleted = payment.status === 'completed';

  return (
    <TableRow className="border-zinc-800 hover:bg-zinc-800/30">
      <TableCell className="text-white">{payment.date}</TableCell>
      <TableCell className="text-white">{payment.plan}</TableCell>
      <TableCell className="text-white">
        {payment.amount.toLocaleString()}원
      </TableCell>
      <TableCell>
        <Badge
          variant={isCompleted ? 'default' : 'secondary'}
          className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
        >
          {isCompleted ? '결제완료' : '처리중'}
        </Badge>
      </TableCell>
    </TableRow>
  );
}
