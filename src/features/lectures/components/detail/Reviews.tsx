'use client';

import type { Review } from '../../types';
import ReviewItem from './ReviewItem';

interface Props {
  reviews: Review[];
}

export default function Reviews({ reviews }: Props) {
  return (
    <section className="space-y-6">
      {/* 리뷰 없는 경우 */}
      {reviews.length === 0 && (
        <div className="text-center py-12 text-zinc-400 bg-zinc-900/30 rounded-lg border border-zinc-800 border-dashed">
          아직 작성된 수강평이 없습니다.
        </div>
      )}

      {/* 리뷰 리스트 */}
      {reviews.length > 0 &&
        reviews.map((review) => <ReviewItem key={review.id} review={review} />)}
    </section>
  );
}
