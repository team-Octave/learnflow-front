// src/features/membership/components/MembershipInfo.tsx

import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import type { MembershipData } from '../types';
import CancelButton from './CancelButton';
import { formatNextBillingText } from '../actions';

interface MembershipInfoProps {
  data: MembershipData | null;
}

export default function MembershipInfo({ data }: MembershipInfoProps) {
  const hasMembership = !!data?.hasMembership;

  return (
    <section className="w-full p-6 rounded-xl bg-zinc-900/40 border border-zinc-700 text-white">
      <h2 className="text-xl font-bold text-white mb-6">멤버십 정보</h2>

      {hasMembership ? (
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-zinc-800 pb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-lg font-semibold">
                  {data?.planName ?? '멤버십'}
                </h3>
                <Badge className="bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 border-emerald-500/30">
                  이용 중
                </Badge>
              </div>

              <p className="text-zinc-400">
                {formatNextBillingText(
                  data?.nextBillingDate,
                  data?.nextBillingAmount,
                )}
              </p>
            </div>

            <CancelButton />
          </div>

          <div className="text-zinc-500 text-sm">
            * 결제 및 이용 관련 문의는 고객센터를 이용해 주세요.
          </div>
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-zinc-400">이용 중인 멤버십이 없어요.</p>

          <Link href="/subscription">
            <button className="px-6 py-3 bg-primary hover:bg-primary/80 cursor-pointer text-white font-medium rounded-lg transition-colors whitespace-nowrap">
              멤버십 시작하기
            </button>
          </Link>
        </div>
      )}
    </section>
  );
}
