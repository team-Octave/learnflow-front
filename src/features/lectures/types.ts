// lxp3/src/features/lectures/types.ts

// ---------------- 연동 후 사용 중인 타입 ---------------

export const CATEGORIES = [
  { id: '0', name: 'ALL', value: 'ALL' },
  { id: '1', name: 'FRONTEND', value: '1' },
  { id: '2', name: 'BACKEND', value: '2' },
  { id: '3', name: 'AI', value: '3' },
  { id: '4', name: 'GAME', value: '4' },
];

export const CATEGORY_MAP = {
  1: 'FRONTEND',
  2: 'BACKEND',
  3: 'AI',
  4: 'GAME',
};

// 강의 난이도 레벨
export type Level = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';

// 카테고리 타입 추가
export type Category = '1' | '2' | '3' | '4';

export interface Query {
  category: Category | 'ALL';
  level: Level | 'ALL';
  sort: Sort;
  page: number;
  limit: number;
}

// 강의 단위
export interface Lecture {
  id: string;
  title: string;
  instructorId: string; // instructor → creatorName + creatorId 로 변경
  instructorDisplayName: string;
  ratingAverage: number;
  enrollmentCount: number; // / studentCount → enrollmentCount 변경됨
  thumbnailUrl: string;
  categoryId: Category; // 임시 string 타입
  level: Level;
  createdAt: string;
  updatedAt?: string; //   updatedAt 추가
  description: string;
  chapters: Chapter[] | null;
}

// ----------- 연동 전 사용중인 타입 --------------

// O/X 퀴즈 문제
export interface Question {
  id: string;
  question: string;
  answer: 'O' | 'X';
}

// 레슨 단위 (영상 또는 퀴즈)
export interface Lesson {
  id: string;
  title: string;
  duration?: string; //  변경됨 — duration(영상 길이)”은 영상 레슨에만 필요하고, 퀴즈 레슨에는 필요 없으니까 선택적(optional)
  type: LessonType;
  videoUrl?: string;
  questions?: Question[];
}

// 챕터 단위 (레슨 여러 개 포함)
export interface Chapter {
  id: string;
  title: string;
  lessons: Lesson[];
}

// 리뷰
export interface Review {
  id: string;
  lectureId: string;
  userId: string;
  nickname: string;
  rating: number;
  createdAt: string; // 변경됨 — date → createdAt
  content: string;
}

// 레슨 타입 (영상 또는 퀴즈)
export type LessonType = 'VIDEO' | 'QUIZ';

export type Sort = 'LATEST' | 'POPULAR' | 'RATING';
