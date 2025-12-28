'use server';
// src/features/lectures/actions.ts
// 강의 및 리뷰 관련 액션 함수 모음

import {
  getLectureById,
  getLectures,
  getReviewById,
} from '@/services/lectures.service';
import type { Query } from './types';
import { ActionState } from '@/shared/types/ActionState';

export async function getLecturesAction(
  query: Query,
): Promise<ActionState<any>> {
  const state = await getLectures(query);
  return state;
}

export async function getLectureByIdAction(
  lectureId: number,
): Promise<ActionState<any>> {
  const state = await getLectureById(lectureId);
  return state;
}

export async function getReviewByIdAction(
  lectureId: number,
  page: number,
): Promise<ActionState<any>> {
  const state = await getReviewById(lectureId, page);
  return state;
}
