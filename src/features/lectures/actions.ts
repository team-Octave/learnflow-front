// src/features/lectures/actions.ts
'use server';

import {
  getLectureById,
  getLectures,
  getReviewById,
  getLessonById,
  getAILessonSummary,
} from '@/services/lectures.service';

import type { Query } from './types';
import type { ActionState } from '@/shared/types/ActionState';
import type { AILessonSummaryResponse } from '@/features/lectures/types';

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

/**
 * 레슨 단건 조회(V2)
 * GET /api/v2/lectures/{lectureId}/lessons/{lessonId}
 */
export async function getLessonByIdAction(
  lectureId: number,
  lessonId: number,
): Promise<ActionState<any>> {
  const state = await getLessonById(lectureId, lessonId);
  return state;
}

/**
 * AI 강의 요약 조회
 * GET /api/ai/summary/{lessonId}
 */
export async function getAILessonSummaryAction(
  lessonId: number,
): Promise<ActionState<AILessonSummaryResponse>> {
  const state = await getAILessonSummary(lessonId);
  return state;
}
