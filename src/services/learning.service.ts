'use server';

import { ReviewRequest } from '@/features/learning/types';
import { authFetch } from '@/lib/api';

export async function getLearningLectures() {
  const response = await authFetch(`/api/v1/enrollment/my`);
  const data = await response.json();
  if (response.ok) {
    return data;
  } else {
    throw new Error(data.message || '강의 목록 조회 실패');
  }
}

export async function writeReview(review: ReviewRequest) {
  const response = await authFetch(`/api/v1/reviews`, {
    method: 'POST',
    body: JSON.stringify(review),
  });
  const data = await response.json();
  if (response.ok) {
    return data;
  } else {
    throw new Error(data.message || '리뷰 작성 실패');
  }
}
export async function deleteReview(reviewId: number) {
  const response = await authFetch(`/api/v1/reviews/${reviewId}`, {
    method: 'DELETE',
  });
  const data = await response.json();
  console.log(data);
  if (response.ok) {
    return data;
  } else {
    throw new Error(data.message || '리뷰 삭제 실패');
  }
}

/* 내 학습 목록 조회
내 학습 목록에서 수강 취소
내 학습 목록에 추가(신규 수강신청)
특정 강의 수강 클릭 시 수강 정보 조회
특정 레슨 완료 등등

수강 페이지도 거기에서 써요
특정 강의 수강 클릭 시 수강 정보 조회
이게 수강 페이지에서 요청할 API 
*/

// 학습 진행 상태(더미 데이터)
// export function getLearningProgress(lectureId: string) {
//   return {
//     lastCompletedLessonId: 'l-2-1',
//     progressRate: 42,
//   };
// }
