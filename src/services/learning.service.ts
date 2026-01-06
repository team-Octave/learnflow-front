'use server';

import { ReviewRequest } from '@/features/learning/types';
import { authFetch } from '@/lib/api';

export async function enrollLecture(lectureId: number): Promise<any> {
  const response = await authFetch(`/api/v1/enrollment`, {
    method: 'POST',
    body: JSON.stringify({ lectureId }),
  });
  return response.json();
}

export async function getLearningLectures() {
  const response = await authFetch(`/api/v1/enrollment/my`);
  return response.json();
}

export async function writeReview(review: ReviewRequest) {
  const response = await authFetch(`/api/v1/reviews`, {
    method: 'POST',
    body: JSON.stringify(review),
  });
  return response.json();
}
export async function deleteReview(reviewId: number) {
  const response = await authFetch(`/api/v1/reviews/${reviewId}`, {
    method: 'DELETE',
  });
  return response.json();
}

export async function getEnrollmentById(enrollmentId: number) {
  const response = await authFetch(`/api/v1/enrollment/select-enrollment`, {
    method: 'POST',
    body: JSON.stringify({ enrollmentId }),
  });
  return response.json();
}

export async function completeLesson(enrollmentId: number, lessonId: number) {
  console.log(enrollmentId, lessonId);
  const response = await authFetch(`/api/v1/enrollment/complete-lesson`, {
    method: 'POST',
    body: JSON.stringify({ enrollmentId, lessonId }),
  });
  return response.json();
}
