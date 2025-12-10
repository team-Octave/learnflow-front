'use client';

import { Star } from 'lucide-react';
import type { Review } from '../../types';

interface Props {
  reviews: Review[];
}

export default function AverageReview({ reviews }: Props) {
  if (reviews.length === 0) {
    return <div className="text-zinc-400 text-sm">아직 리뷰가 없습니다.</div>;
  }

  const avg =
    reviews.reduce((acc, cur) => acc + cur.rating, 0) / reviews.length;

  return (
    <div className="w-full bg-zinc-900/40 border border-zinc-800 rounded-2xl py-10 px-4 flex flex-col items-center justify-center text-center">
      {/* 평균 점수 */}
      <div className="text-5xl font-bold text-white mb-3">{avg.toFixed(1)}</div>

      {/* 별 아이콘 */}
      <div className="flex items-center gap-1 mb-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-6 h-6 ${
              i < Math.round(avg)
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-zinc-700'
            }`}
          />
        ))}
      </div>

      {/* 리뷰 개수 */}
      <div className="text-sm text-zinc-400">{reviews.length}개의 수강평</div>
    </div>
  );
}
