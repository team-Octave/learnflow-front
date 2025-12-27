'use server';

import {
  completeLesson,
  deleteReview,
  enrollLecture,
  getEnrollmentById,
  getLearningLectures,
  writeReview,
} from '@/services/learning.service';
import { Enrollment, LearningLecture, ReviewRequest } from './types';
import { revalidatePath } from 'next/cache';
import { ActionState } from '@/shared/types/ActionState';

export async function enrollLectureAction(
  lectureId: number,
): Promise<ActionState<any>> {
  const state = await enrollLecture(lectureId);
  return state;
}

export async function getLearningLecturesAction(): Promise<
  ActionState<LearningLecture[]>
> {
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
): Promise<ActionState<Enrollment>> {
  const state = await getEnrollmentById(enrollmentId);
  return state;
}

export async function completeLessonAction(
  enrollmentId: number,
  lessonId: number,
): Promise<ActionState<any>> {
  const state = await completeLesson(enrollmentId, lessonId);
  return state;
}
