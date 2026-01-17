import { Category, Chapter, LessonType, Level } from '../lectures/types';

// --------------- 수정 후 -----------------

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
}

// 폼 관련 타입은 schemas.ts에서 통합 관리
export type {
  CurriculumFormValues,
  Chapter as CreatorChapter,
  Lesson as CreatorLesson,
  QuizQuestion as CreatorQuizQuestion,
} from './schemas';
