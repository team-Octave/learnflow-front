// src/features/learning/actions.ts
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

// export async function getEnrollmentByIdAction(
//   enrollmentId: number,
// ): Promise<ActionState<any>> {
//   const state = await getEnrollmentById(enrollmentId);
//   console.log('enrollment');
//   return state;
// }

// export async function completeLessonAction(
//   enrollmentId: number,
//   lessonId: number,
// ): Promise<ActionState<any>> {
//   const state = await completeLesson(enrollmentId, lessonId);
//   return state;
// }
export async function completeLessonAction(
  enrollmentId: number,
  lessonId: number,
) {
  console.log('[completeLessonAction] called', { enrollmentId, lessonId });
  const state = await completeLesson(enrollmentId, lessonId);
  console.log('[completeLessonAction] result', state.success);
  return state;
}

export async function getEnrollmentByIdAction(enrollmentId: number) {
  console.log('[getEnrollmentByIdAction] called', { enrollmentId });
  const state = await getEnrollmentById(enrollmentId);
  console.log(
    '[getEnrollmentByIdAction] result',
    state.success,
    state.data?.completedLessonIds?.length,
  );
  return state;
}
