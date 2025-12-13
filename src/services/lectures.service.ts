// src/services/lectures.service.ts
import type { Query } from '@/features/lectures/types';
import { commonFetch } from '@/lib/api';

export async function getLectures({ category, level, sort, page }: Query) {
  const url = `/api/v1/lectures?category=${category}&level=${level}&sort=${sort}&page=${
    page - 1
  }`;
  const response = await commonFetch(url);
  const data = await response.json();
  if (response.ok) {
    return data;
  } else {
    throw new Error(data.message || '강의 목록 조회 실패');
  }
}

// 지원님 상세 페이지 구현할 때 이 함수 사용하시면 됩니다!!
export async function getLectureById(lectureId: number) {
  const url = `/api/v1/lectures/${lectureId}`;
  const response = await commonFetch(url);
  const data = await response.json();
  if (response.ok) {
    return data;
  } else {
    throw new Error(data.message || '강의 단건 조회 실패');
  }
}

// export const getAllLectures = (): Lecture[] => lectures;

// export const getLectureById = (id: string): Lecture | undefined =>
//   lectures.find((lecture) => lecture.id === id);

// export const getLecturesByCategory = (category: string): Lecture[] => {
//   if (category === 'ALL') return lectures;
//   return lectures.filter((lecture) => lecture.category === category);
// };

// export const getReviewsByLectureId = (lectureId: string): Review[] =>
//   reviews.filter((review) => review.lectureId === lectureId);

// export const searchLectures = (keyword: string): Lecture[] => {
//   const lower = keyword.trim().toLowerCase();
//   if (!lower) return lectures;
//   return lectures.filter(
//     (lecture) =>
//       lecture.title.toLowerCase().includes(lower) ||
//       lecture.creatorName.toLowerCase().includes(lower),
//   );
// };

// /**
//  * URL 쿼리 기반으로 강의 가져오기
//  */
// export interface QueryOptions {
//   category?: string;
//   level?: string;
//   sort?: string;
//   page?: number;
//   limit?: number;
// }

// export const getLecturesByQuery = async ({
//   category = 'ALL',
//   level = 'ALL',
//   sort = 'POPULAR',
//   page = 1,
//   limit = 16,
// }: QueryOptions): Promise<{ items: Lecture[]; totalCount: number }> => {
//   // 항상 대문자로 정규화
//   category = category.toUpperCase();
//   level = level.toUpperCase();
//   sort = sort.toUpperCase();

//   let result = [...lectures];

//   //  1) 카테고리 필터
//   if (category !== 'ALL') {
//     result = result.filter((lecture) => lecture.category === category);
//   }

//   //  2) 난이도 필터
//   if (level !== 'ALL') {
//     result = result.filter((lecture) => lecture.level === level);
//   }

//   //  3) 정렬
//   switch (sort) {
//     case 'POPULAR':
//       result.sort((a, b) => b.enrollmentCount - a.enrollmentCount);
//       break;

//     case 'NEWEST':
//       result.sort(
//         (a, b) =>
//           new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
//       );
//       break;

//     case 'RATING':
//       result.sort((a, b) => b.rating - a.rating);
//       break;
//   }

//   const totalCount = result.length;

//   // 4) 페이지네이션
//   const start = (page - 1) * limit;
//   const end = start + limit;
//   const items = result.slice(start, end);

//   return { items, totalCount };
// };
