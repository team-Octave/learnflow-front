'use client';

import { Star } from 'lucide-react';
import type { Review } from '../../types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Props {
  reviews: Review[];
}

export default function Reviews({ reviews }: Props) {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold text-white">수강평</h2>

      {/* 리뷰 없는 경우 */}
      {reviews.length === 0 && (
        <div className="text-center py-12 text-zinc-400 bg-zinc-900/30 rounded-lg border border-zinc-800 border-dashed">
          아직 작성된 수강평이 없습니다.
        </div>
      )}

      {/* 리뷰 있는 경우 */}
      {reviews.length > 0 &&
        reviews.map((review) => (
          <div
            key={review.id}
            className="bg-zinc-900/30 rounded-lg border border-zinc-800 p-6"
          >
            {/* 사용자 정보 */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src="" alt={review.nickname} />
                  <AvatarFallback className="bg-zinc-700 text-zinc-300 font-bold">
                    {review.nickname[0]}
                  </AvatarFallback>
                </Avatar>

                <div>
                  <p className="font-medium text-white">{review.nickname}</p>

                  {/* 별점 */}
                  <div className="flex items-center text-yellow-500 text-xs">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < review.rating ? 'fill-current' : 'text-zinc-700'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* 날짜 */}
              <span className="text-xs text-zinc-500">{review.createdAt}</span>
            </div>

            {/* 리뷰 내용 */}
            <p className="text-zinc-300 leading-relaxed">{review.content}</p>
          </div>
        ))}
    </section>
  );
}
