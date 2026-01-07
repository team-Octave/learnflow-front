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

// 수강(enrollment) ID를 이용해 수강 정보를 조회하는 역할
// 수강 ID를 받아서, 실제 조회 함수(getEnrollmentById)를 호출하고 그 결과(ActionState)를 그대로 반환하는 서버 액션 함수”
export async function getEnrollmentByIdAction(
  // enrollmentId 조회하려는 수강 ID
  enrollmentId: number,
  // 이 함수는 Promise를 반환 (비동기 함수)
): Promise<ActionState<any>> {
  //<ActionState<any> 서버 액션의 결과 상태를 감싸는 타입
  // 결과를 state 변수에 저장
  const state = await getEnrollmentById(enrollmentId); // getEnrollmentById : 실제로 DB나 API에서 수강 정보를 조회하는 함수
  return state; //조회 결과(ActionState)를 그대로 반환
}

export async function completeLessonAction(
  enrollmentId: number,
  lessonId: number,
): Promise<ActionState<any>> {
  const state = await completeLesson(enrollmentId, lessonId);
  return state;
}
