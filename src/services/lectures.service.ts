// src/services/lectures.service.ts
import { lectures, reviews } from '@/lib/mock-data';
import type { Lecture, Review } from '@/features/lectures/types';

export const getAllLectures = (): Lecture[] => lectures;

export const getLectureById = (id: string): Lecture | undefined =>
  lectures.find((lecture) => lecture.id === id);

export const getLecturesByCategory = (category: string): Lecture[] => {
  if (category === 'ALL') return lectures;
  return lectures.filter((lecture) => lecture.category === category);
};

export const getReviewsByLectureId = (lectureId: string): Review[] =>
  reviews.filter((review) => review.lectureId === lectureId);

export const searchLectures = (keyword: string): Lecture[] => {
  const lower = keyword.trim().toLowerCase();
  if (!lower) return lectures;
  return lectures.filter(
    (lecture) =>
      lecture.title.toLowerCase().includes(lower) ||
      lecture.creatorName.toLowerCase().includes(lower),
  );
};

/**
 * URL 쿼리 기반으로 강의 가져오기
 */
export interface QueryOptions {
  category?: string;
  level?: string;
  sort?: string;
  page?: number;
  limit?: number;
}

export const getLecturesByQuery = async ({
  category = 'ALL',
  level = 'ALL',
  sort = 'POPULAR',
  page = 1,
  limit = 16,
}: QueryOptions): Promise<{ items: Lecture[]; totalCount: number }> => {
  // 항상 대문자로 정규화
  category = category.toUpperCase();
  level = level.toUpperCase();
  sort = sort.toUpperCase();

  let result = [...lectures];

  //  1) 카테고리 필터
  if (category !== 'ALL') {
    result = result.filter((lecture) => lecture.category === category);
  }

  //  2) 난이도 필터
  if (level !== 'ALL') {
    result = result.filter((lecture) => lecture.level === level);
  }

  //  3) 정렬
  switch (sort) {
    case 'POPULAR':
      result.sort((a, b) => b.enrollmentCount - a.enrollmentCount);
      break;

    case 'NEWEST':
      result.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
      break;

    case 'RATING':
      result.sort((a, b) => b.rating - a.rating);
      break;
  }

  const totalCount = result.length;

  // 4) 페이지네이션
  const start = (page - 1) * limit;
  const end = start + limit;
  const items = result.slice(start, end);

  return { items, totalCount };
};
