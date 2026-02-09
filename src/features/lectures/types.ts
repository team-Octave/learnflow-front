// src/features/lectures/types.ts

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
  id: number;
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
  aiLessonSummaries?: AILessonSummary[]; //ai 요약추가
}

export interface QuizQuestion {
  id: number;
  question: string; // 질문 텍스트
  correct: boolean; // 정답 여부 (true/false)
  questionOrder: number; // 백엔드와 동일하게
}

// 레슨 단위 (영상 또는 퀴즈)
export interface Lesson {
  id: number;
  lessonTitle: string;
  isFreePreview: boolean;
  lessonOrder: number;
  lessonTypeDisplayName: LessonType;
  quizQuestions: null | QuizQuestion[];
  videoUrl?: string | null;
  duration?: string;
}

// 챕터 단위 (레슨 여러 개 포함)
export interface Chapter {
  id: number;
  chapterTitle: string;
  lessons: Lesson[];
}

// 리뷰
export interface Review {
  reviewId: string;
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

// ai 강의요약안내 ( api명세대로 )
export type AISummaryStatus =
  | 'COMPLETED'
  | 'PROCESSING'
  | 'READY'
  | 'FAILED'
  | 'NOT_FOUND';

// “COMPLETED일 때
export type AILessonSummaryContent = {
  overview: string;
  keyTakeaways: string[];
};

// API / 서버 액션에서 내려오는 “응답 형태”
export type AILessonSummaryResponse = {
  lessonId: number;
  status: AISummaryStatus;
  content: AILessonSummaryContent | null;
};

// 프론트 내부에서 사용하는 “도메인 모델”
export type AILessonSummary = {
  lessonId: number;
  status: AISummaryStatus;
  content: AILessonSummaryContent | null;
};
