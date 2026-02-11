'use client';

import type { Review } from '../../types';
import MainPagination from '../main/MainPagination';
import ReviewItem from './ReviewItem';
import ReviewPagination from './ReviewPagination';

interface ReviewsProps {
  reviewData: any;
}

export default function Reviews({ reviewData }: ReviewsProps) {
  const reviews: Review[] = reviewData.content;
  return (
    <section className="space-y-6" aria-label="리뷰 목록">
      {/* 리뷰 없는 경우 */}
      {reviews.length === 0 && (
        <div className="text-center py-12 text-zinc-400 bg-zinc-900/30 rounded-lg border border-zinc-800 border-dashed">
          아직 작성된 수강평이 없습니다.
        </div>
      )}

      {/* 리뷰 리스트 */}
      {reviews.length > 0 && (
        <>
          {reviews.map((review) => (
            <ReviewItem key={review.reviewId} review={review} />
          ))}
          <ReviewPagination
            currentPage={reviewData.pageable.pageNumber + 1}
            totalPages={reviewData.totalPages}
          />
        </>
      )}
    </section>
  );
}
