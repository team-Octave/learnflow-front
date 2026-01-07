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

// 특정 enrollmentId를 받아서 해당 Enrollment 정보를 조회한 뒤 그대로 반환하는 함수
export async function getEnrollmentByIdAction(
  enrollmentId: number, //조회할 대상의 ID
  // 이 함수의 최종 반환값: Promise<any> (타입 지정 안 되어 있음)
): Promise<ActionState<any>> {
  const state = await getEnrollmentById(enrollmentId); //getEnrollmentById 실제 데이터를 가져오는 함수 (서비스/리포지토리 계층일 가능성 큼)
  return state;
}
/*
getEnrollmentByIdAction(enrollmentId) 호출
내부에서await getEnrollmentById(enrollmentId)
실행
getEnrollmentById가:DB 조회, API 호출,혹은 다른 비동기 작업 수행 => 결과를 state 변수에 저장
state를 그대로 반환
호출한 쪽에서 await으로 결과 수신
*/

export async function completeLessonAction(
  enrollmentId: number,
  lessonId: number,
): Promise<ActionState<any>> {
  const state = await completeLesson(enrollmentId, lessonId);
  return state;
}
