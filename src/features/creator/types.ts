import { Category, Level } from '../lectures/types';

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

export interface Chapter {
  chapterId: string;
  chapterTitle: string;
  chapterOrder: number;
  lessons: Lesson[];
}

export interface Lesson {
  lessonId: string;
  lessonTitle: string;
  lessonOrder: number;
  lessonType: 'QUIZ' | 'VIDEO';
  videoURL?: string;
  questions?: Question[];
  duration?: string;
}

export interface Question {
  questionId?: string;
  questionText: string;
  questionOrder: number;
  answer: 'O' | 'X';
}
