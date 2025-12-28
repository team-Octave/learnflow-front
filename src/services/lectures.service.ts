// src/services/lectures.service.ts
import type { Query } from '@/features/lectures/types';
import { commonFetch } from '@/shared/api';

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
