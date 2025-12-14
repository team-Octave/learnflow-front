import { Category, Chapter, LessonType, Level } from '../lectures/types';

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
  createdAt: string;
}

export interface CurriculumFormValues {
  chapters: CreatorChapter[];
}

export interface CreatorChapter {
  chapterTitle: string;
  lessons: CreatorLesson[];
}

export interface CreatorLesson {
  lessonTitle: string;
  lessonType: LessonType;
  isFreePreview: boolean;
  videoUrl: string | null;
  quizQuestions: CreatorQuizQuestion[] | null;
}

export interface CreatorQuizQuestion {
  question: string;
  correct: boolean;
  questionOrder: number;
}
