// src/features/audit/types.ts

export type AuditLessonType = 'VIDEO' | 'QUIZ';

export interface AuditQuizQuestion {
  id: number | string;
  question: string;
  answer: 'O' | 'X' | boolean;
}

export interface AuditLesson {
  id?: number | string;
  title: string;
  type: AuditLessonType;

  // VIDEO
  videoUrl?: string;

  // QUIZ
  questions?: AuditQuizQuestion[];
}

export interface AuditChapter {
  id?: number | string;
  title: string;
  lessons: AuditLesson[];
}

export interface AuditDetail {
  id: number | string;
  title: string;
  description: string;
  thumbnail: string;

  difficulty?: string;
  category?: string;
  instructor?: string;

  chapters: AuditChapter[];
}

export interface AuditRejectPayload {
  reasons: string[];
  detail?: string;
}
