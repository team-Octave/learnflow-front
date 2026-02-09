import { Category, Chapter, Level, Payment } from '../lectures/types';

export type LectureStatus =
  | 'PUBLISHED'
  | 'UNPUBLISHED'
  | 'SUBMITTED'
  | 'REJECTED';

export interface BasicInfo {
  title: string;
  categoryId: Category | '';
  level: Level | '';
  description: string;
  paymentType: Payment;
  file: File | null;
}
export interface CreatorLecture {
  id: number;
  title: string;
  description: string;
  categoryId: Category;
  level: Level;
  statusDisplayName: LectureStatus;
  instructorId: string;
  instructorDisplayName: string;
  ratingAverage: number | null;
  enrollmentCount: number | null;
  thumbnailUrl: string;
  chapters: Chapter[] | null;
  createdAt: string;
  rejectCategories?: string[];
  rejectReason?: string;
  paymentType: Payment;
}

// 폼 관련 타입은 schemas.ts에서 통합 관리
export type {
  CurriculumFormValues,
  Chapter as CreatorChapter,
  Lesson as CreatorLesson,
  QuizQuestion as CreatorQuizQuestion,
} from './schemas';
