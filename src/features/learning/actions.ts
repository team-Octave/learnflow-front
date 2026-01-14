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

export async function completeLessonAction(
  enrollmentId: number,
  lectureId: number,
  lessonId: number,
): Promise<ActionState<any>> {
  const state = await completeLesson(enrollmentId, lessonId);

  if (state.success) {
    // 내 강의 목록 진행률 갱신
    revalidatePath('/mylearning');

    // ✅ 현재 수강 플레이 레이아웃/사이드바 갱신 (라우트 구조 맞춤)
    revalidatePath(`/play/${enrollmentId}/${lectureId}`, 'layout');
  }

  return state;
}
