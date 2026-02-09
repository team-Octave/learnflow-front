// src/features/membership/components/PaymentHistory.tsx

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import PaymentRow from './PaymentRow';
import { MembershipInfoResponse } from '../types';

interface PaymentHistoryProps {
  data: MembershipInfoResponse | null;
}

export default function PaymentHistory({ data }: PaymentHistoryProps) {
  const payments = data?.paymentHistory ?? [];

  return (
    <section className="w-full p-6 rounded-xl bg-zinc-900/40 border border-zinc-700 text-white">
      <h2 className="text-xl font-bold text-white mb-6">결제 내역</h2>

      {payments.length > 0 ? (
        <div className="overflow-hidden rounded-lg border border-zinc-800">
          <Table>
            <TableHeader>
              <TableRow className="border-zinc-800 hover:bg-zinc-800/50">
                <TableHead className="text-zinc-400">결제일</TableHead>
                <TableHead className="text-zinc-400">플랜</TableHead>
                <TableHead className="text-zinc-400">금액</TableHead>
                <TableHead className="text-zinc-400">상태</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {payments.map((p) => (
                <PaymentRow key={p.id} payment={p} />
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <p className="text-zinc-400 text-center py-8">결제 내역이 없습니다.</p>
      )}
    </section>
  );
}
