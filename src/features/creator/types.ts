import { Category, Level } from '../lectures/types';

// --------------- 수정 후 -----------------

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
  statusDisplayName: 'PUBLISHED' | 'UNPUBLISHED';
  instructorId: string;
  instructorDisplayName: string;
  ratingAverage: number | null;
  enrollmentCount: number | null;
  thumbnailUrl: string;
  chapters: Chapter[] | null;
}

export type LessonType = 'VIDEO' | 'QUIZ';

export interface Chapter {
  chapterId?: number;
  chapterTitle: string;
  order: number;
  lessons: Lesson[];
}

export interface Lesson {
  lessonId?: number;
  lessonTitle: string;
  order: number;
  lessonType: LessonType;
  isFreePreview: boolean;
  videoUrl: string | null; // VIDEO 타입일 때 사용
  quizQuestions: QuizQuestion[] | null; // QUIZ 타입일 때 사용
}

export interface QuizQuestion {
  questionId?: number; // 신규 생성 시 없을 수 있음
  questionText: string;
  answer: 'O' | 'X';
  order: number;
}

// 폼 전체에서 사용할 데이터 타입
export interface CurriculumFormValues {
  chapters: Chapter[];
}
