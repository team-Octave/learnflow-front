"use client";

import { Star } from "lucide-react";
import type { Review } from "../../types";

interface Props {
  reviews: Review[];
}

export default function AverageReview({ reviews }: Props) {
  if (reviews.length === 0) {
    return (
      <div className="text-zinc-400 text-sm">
        아직 리뷰가 없습니다.
      </div>
    );
  }

  const avg =
    reviews.reduce((acc, cur) => acc + cur.rating, 0) / reviews.length;

  return (
    <div className="space-y-2 mb-6">
      <h3 className="text-xl font-bold text-white">평균 평점</h3>

      <div className="flex items-center gap-3">
        {/* 평균 점수 */}
        <span className="text-4xl font-bold text-yellow-400">
          {avg.toFixed(1)}
        </span>

        {/* 별 아이콘 */}
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-6 h-6 ${
                i < Math.round(avg)
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-zinc-700"
              }`}
            />
          ))}
        </div>

        {/* 리뷰 개수 */}
        <span className="text-sm text-zinc-400">
          ({reviews.length}개의 리뷰)
        </span>
      </div>
    </div>
  );
}
