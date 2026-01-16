'use server';
// src/features/lectures/actions.ts
// 강의 및 리뷰 관련 액션 함수 모음

import {
  getLectureById,
  getLectures,
  getReviewById,
  getLessonById,
} from '@/services/lectures.service';

import type { Query } from './types';
import type { ActionState } from '@/shared/types/ActionState';

export async function getLecturesAction(
  query: Query,
): Promise<ActionState<any>> {
  const state = await getLectures(query);
  return state;
}

// 강의 ID를 받아서 해당 강의 정보를 비동기로 가져온 뒤 그대로 반환하는 함수
export async function getLectureByIdAction(
  lectureId: number,
): Promise<ActionState<any>> {
  const state = await getLectureById(lectureId);
  console.log('lecture');
  return state;
}

export async function getReviewByIdAction(
  lectureId: number,
  page: number,
): Promise<ActionState<any>> {
  const state = await getReviewById(lectureId, page);
  return state;
}

/**
 * ✅ 레슨 단건 조회(V2)
 * GET /api/v2/lectures/{lectureId}/lessons/{lessonId}
 */
export async function getLessonByIdAction(
  lectureId: number,
  lessonId: number,
): Promise<ActionState<any>> {
  const state = await getLessonById(lectureId, lessonId);
  console.log('lesson');
  return state;
}
