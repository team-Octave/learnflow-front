// src/services/lectures.service.ts
import { lectures, reviews } from '@/lib/mock-data';
import type { Lecture, Review } from '@/features/lectures/types';

/*
4. src/services/lectures.service.ts
  - 위에서 언급했듯이 lecturesServices에 모두 담아서 export하지말고, 개별 함수로 작성 후 개별 export하도록 수정.
 */

// 모든 강의 가져오기
export const getAllLectures = (): Lecture[] => {
  return lectures;
};

// 강의 상세 가져오기
export const getLectureById = (id: string): Lecture | undefined => {
  return lectures.find((lecture) => lecture.id === id);
};

// 카테고리별 강의 가져오기
export const getLecturesByCategory = (category: string): Lecture[] => {
  if (category === 'all') return lectures;
  return lectures.filter((lecture) => lecture.category === category);
};

// 특정 강의 리뷰 가져오기
export const getReviewsByLectureId = (lectureId: string): Review[] => {
  return reviews.filter((review) => review.lectureId === lectureId);
};

// 키워드 검색 (title, creatorName 기준)
export const searchLectures = (keyword: string): Lecture[] => {
  const lower = keyword.trim().toLowerCase();
  if (!lower) return lectures;

  return lectures.filter(
    (lecture) =>
      lecture.title.toLowerCase().includes(lower) ||
      lecture.creatorName.toLowerCase().includes(lower)
  );
};
