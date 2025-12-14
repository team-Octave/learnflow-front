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

export interface QuizQuestion {
  question: string; // 질문 텍스트
  correct: boolean; // 정답 여부 (true/false)
  questionOrder: number; // 순서
}

export interface Lesson {
  lessonTitle: string;
  lessonType: LessonType;
  isFreePreview: boolean;
  videoUrl: string | null; // VIDEO 전용
  quizQuestions: QuizQuestion[] | null; // QUIZ 전용
}

export interface Chapter {
  chapterTitle: string;
  lessons: Lesson[];
}

export interface CurriculumFormValues {
  chapters: Chapter[];
}
