'use server';

import {
  completeLesson,
  deleteReview,
  enrollLecture,
  getEnrollmentById,
  getLearningLectures,
  writeReview,
} from '@/services/learning.service';
import { ReviewRequest } from './types';
import { revalidatePath } from 'next/cache';
import { ActionState } from '@/shared/types/ActionState';

export async function enrollLectureAction(
  lectureId: number,
): Promise<ActionState<any>> {
  const state = await enrollLecture(lectureId);
  return state;
}

export async function getLearningLecturesAction(): Promise<ActionState<any>> {
  const state = await getLearningLectures();
  return state;
}

export async function writeReviewAction(
  review: ReviewRequest,
): Promise<ActionState<any>> {
  const state = await writeReview(review);
  revalidatePath('/mylearning');
  return state;
}

export async function deleteReviewAction(
  reviewId: number,
): Promise<ActionState<any>> {
  const state = await deleteReview(reviewId);
  return state;
}

export async function getEnrollmentByIdAction(
  enrollmentId: number,
): Promise<ActionState<any>> {
  const state = await getEnrollmentById(enrollmentId);
  return state;
}

// export async function completeLessonAction(
//   enrollmentId: number,
//   lessonId: number,
// ): Promise<ActionState<any>> {
//   const state = await completeLesson(enrollmentId, lessonId);
//   if (state.success) {
//     revalidatePath(`/play/${enrollmentId}`);
//   }
//   return state;
// }

export async function completeLessonAction(
  enrollmentId: number,
  lessonId: number,
): Promise<ActionState<any>> {
  // 1) 완료 처리
  const completeState = await completeLesson(enrollmentId, lessonId);

  if (!completeState?.success) {
    return completeState; // 실패면 그대로 반환
  }

  // 2) ✅ 완료 후 최신 enrollment 재조회해서 반환
  const enrollmentState = await getEnrollmentById(enrollmentId);
  return enrollmentState;
}
