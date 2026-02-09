// src/services/lectures.service.ts
import type { Query, AILessonSummaryResponse } from '@/features/lectures/types';
import { authFetch, commonFetch } from '@/shared/api';

export async function getLectures({ category, level, sort, page }: Query) {
  const url = `/api/v1/lectures?category=${category}&level=${level}&sort=${sort}&page=${
    page - 1
  }`;
  const response = await commonFetch(url);
  return response.json();
}

export async function getLectureById(lectureId: number) {
  const url = `/api/v1/lectures/${lectureId}`;
  const response = await commonFetch(url);
  return response.json();
}

export async function getReviewById(lectureId: number, page: number) {
  const response = await commonFetch(
    `/api/v1/reviews/lectures/${lectureId}?page=${
      page - 1
    }&size=3&sort=createdAt,desc`,
  );
  return response.json();
}

/**
 *  레슨 단건 조회 (V2)
 * GET /api/v2/lectures/{lectureId}/lessons/{lessonId}
 */
export async function getLessonById(lectureId: number, lessonId: number) {
  const response = await authFetch(
    `/api/v2/lectures/${lectureId}/lessons/${lessonId}`,
  );
  return response.json();
}

// ai 강의 요약 안내
export async function getAILessonSummary(lessonId: number) {
  const res = await commonFetch(`/api/ai/summary/${lessonId}`);

  return res.json();
}
