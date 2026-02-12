'use client';

import { Star } from 'lucide-react';
import type { Review } from '../../types';

interface Props {
  reviews: Review[];
  ratingAverage: number | null;
}

export default function AverageReview({ reviews, ratingAverage }: Props) {
  if (reviews.length === 0) {
    return <p className="text-zinc-400 text-sm">아직 리뷰가 없습니다.</p>;
  }

  const displayRating = ratingAverage ? ratingAverage.toFixed(1) : '0.0';

  return (
    <article className="w-full bg-zinc-900/40 border border-zinc-800 rounded-2xl py-10 px-4 flex flex-col items-center justify-center text-center">
      {/* 평균 점수 */}
      <strong className="text-5xl font-bold text-white mb-3">
        {displayRating}
      </strong>

      {/* 별 아이콘 */}
      <div className="flex items-center gap-1 mb-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-6 h-6 ${
              i < Math.round(ratingAverage || 0)
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-zinc-700'
            }`}
          />
        ))}
      </div>

      {/* 리뷰 개수 */}
      <span className="text-sm text-zinc-400">{reviews.length}개의 수강평</span>
    </article>
  );
}
