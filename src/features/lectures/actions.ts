// src/features/lectures/actions.ts
// 강의 및 리뷰 관련 액션 함수 모음

import { getLectures } from '@/services/lectures.service';
import type { Lecture, Query, Review } from './types';
import { commonFetch } from '@/lib/api';

interface ActionState<T> {
  success: boolean;
  error?: string;
  data?: T;
}

export async function getLecturesAction(
  query: Query,
): Promise<ActionState<Lecture[]>> {
  try {
    const body = await getLectures(query);
    return { success: true, data: body.data.content };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : '강의 목록 조회 실패',
    };
  }
}

// // 모든 강의
// export const loadLectures = (): Lecture[] => {
//   return getAllLectures();
// };

// // 특정 강의 상세
// export const loadLectureDetail = (id: string): Lecture | undefined => {
//   return getLectureById(id);
// };

// // 카테고리별 강의
// export const loadLecturesByCategory = (category: string): Lecture[] => {
//   return getLecturesByCategory(category);
// };

// // 특정 강의 리뷰
// export const loadReviews = (lectureId: string): Review[] => {
//   return getReviewsByLectureId(lectureId);
// };
