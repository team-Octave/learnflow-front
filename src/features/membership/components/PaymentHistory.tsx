// src/features/membership/components/PaymentHistory.tsx

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import PaymentRow from './PaymentRow';
import type { PaymentHistoryResponse } from '../types';

// 부모 컴포넌트 : MembershipPage

// 결제 내역 배열(payments) 을 props로 받는다
// 이 컴포넌트로 들어오는 택배(Props) 안에는 반드시 payments라는 이름의 **리스트([])**가 들어있어야 해!"라고 규칙을 정해둔 것
interface Props {
  payments: PaymentHistoryResponse[]; //[] (대괄호): **배열(Array)**을 의미
}

// props.payments를 직접 변수처럼 사용하겠다는 뜻
// 구조 분해 할당' : 박스 안에서 payments 알맹이만 쏙 빼서 바로 쓸게!"**라고 선언
export default function PaymentHistory({ payments }: Props) {
  return (
    <section className="w-full p-6 rounded-xl bg-zinc-900/40 border border-zinc-700 text-white">
      <h2 className="text-xl font-bold text-white mb-6">결제 내역</h2>

      {/* 결제 데이터의 개수를 뜻하며, 이 숫자가 0보다 큰지 확인하여 데이터가 있을 때만 표를 보여주기 위해 사용된 코드 */}
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
              {payments.map((payment) => (
                <PaymentRow key={payment.id} payment={payment} />
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <p className="text-zinc-400">결제 내역이 없습니다.</p>
      )}
    </section>
  );
}
