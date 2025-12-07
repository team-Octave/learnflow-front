//src/features/lectures/actions.ts
// 강의(Lecture)와 리뷰(Review) 관련 데이터를 가져오는 액션 함수들을 정의
//mock 서비스에서 강의와 리뷰 데이터를 가져오는 래퍼(wrapper) 함수들을 모아둔 곳

import { lecturesService } from '@/services/lectures.service';
import type { Lecture, Review } from './types';

// 모든 강의 데이터를 가져와 반환합니다.
export const loadLectures = (): Lecture[] => {
  return lecturesService.getAllLectures();
};
// 특정 강의 ID를 기준으로 강의 상세 정보를 가져옵니다.
export const loadLectureDetail = (id: string): Lecture | undefined => {
  return lecturesService.getLectureById(id);
};
// 특정 카테고리의 강의만 필터링해서 가져옵니다.
export const loadLecturesByCategory = (category: string): Lecture[] => {
  return lecturesService.getLecturesByCategory(category);
};
// 특정 강의의 리뷰를 가져옵니다.
export const loadReviews = (lectureId: string): Review[] => {
  return lecturesService.getReviewsByLectureId(lectureId);
};
