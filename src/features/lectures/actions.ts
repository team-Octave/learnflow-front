'use server';
// src/features/lectures/actions.ts
// 강의 및 리뷰 관련 액션 함수 모음

import {
  getLectureById,
  getLectures,
  getReviewById,
} from '@/services/lectures.service';
import type { Lecture, Query, Review } from './types';

interface ActionState<T> {
  success: boolean;
  error?: string;
  data?: T;
}

export async function getLecturesAction(
  query: Query,
): Promise<ActionState<any>> {
  try {
    const body = await getLectures(query);
    return { success: true, data: body.data };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : '강의 목록 조회 실패',
    };
  }
}

// 지원님 상세 페이지 구현할 때 이 함수 사용하시면 됩니다!
export async function getLectureByIdAction(
  lectureId: number,
): Promise<ActionState<Lecture>> {
  try {
    const body = await getLectureById(lectureId);
    return { success: true, data: body.data };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : '강의 단건 조회 실패',
    };
  }
}

export async function getReviewByIdAction(
  lectureId: number,
): Promise<ActionState<Review[]>> {
  try {
    const body = await getReviewById(lectureId);
    return { success: true, data: body.data.content };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : '리뷰 조회 실패',
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
