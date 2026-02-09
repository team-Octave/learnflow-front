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

export type Level = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';

export type Category = '1' | '2' | '3' | '4';

export type Payment = 'FREE' | 'PAID';

export type LessonType = 'VIDEO' | 'QUIZ';

export type Sort = 'LATEST' | 'POPULAR' | 'RATING';

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
  instructorId: string;
  instructorDisplayName: string;
  ratingAverage: number;
  enrollmentCount: number;
  thumbnailUrl: string;
  categoryId: Category;
  level: Level;
  createdAt: string;
  updatedAt?: string;
  description: string;
  chapters: Chapter[] | null;

  paymentType: Payment;
}

export interface QuizQuestion {
  id: number;
  question: string;
  correct: boolean;
  questionOrder: number;
}

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
  createdAt: string;
  content: string;
}
