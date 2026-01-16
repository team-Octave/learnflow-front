// src/features/audit/types.ts

import { Category } from '../lectures/types';

export type AuditApprovalItem = {
  approvalId: number;
  lectureId: number;
  thumbnailUrl: string | null;
  lectureTitle: string;
  nickname: string;
  requestDate: string; // ISO string
  lectureStatus: string; // SUBMIT 등
};

// UI에서 쓰기 좋은 형태(기존 AuditTable 호환)
export type AuditLecture = {
  lectureId: number; // lectureId로 사용
  lectureTitle: string; // lectureTitle
  nickname: string; // nickname
  thumbnailUrl: string | null;
  requestDate: string; // requestDate
  lectureStatus: 'SUBMITTED';
};

export type AuditLectureListResponse = {
  approvals: AuditLecture[];
  total: number;
  page: number;
  size: number;
};

// -------- 상세(approvals detail) --------

export type ApprovalLessonRef = {
  lessonId: number;
  order: number;
};

export type ApprovalChapter = {
  chapterId: number;
  chapterTitle: string;
  order: number;
  lessons: ApprovalLessonRef[];
};

export type ApprovalDetail = {
  lectureId: number;
  title: string;
  description: string;
  instructorName: string; //  강사(요청자) 닉네임
  level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  categoryId: Category;
  thumbnailUrl: string | null;
  chapters: ApprovalChapter[];
};

// -------- 레슨 상세(admin lesson detail) --------

export type AdminQuizQuestion = {
  id: number;
  question: string;
  orderIndex: number;
  correct: boolean;
};

export type AdminLessonDetail = {
  id: number;
  lessonTitle: string;
  lessonTypeDisplayName: 'VIDEO' | 'QUIZ';
  lessonOrder: number;
  videoUrl: string | null;
  quizQuestions: AdminQuizQuestion[] | null;
};

// -------- 반려 enum --------
export type RejectCategory =
  | 'CONTENT_QUALITY_LOW'
  | 'LECTURE_INFO_MISMATCH'
  | 'MEDIA_QUALITY_ISSUE'
  | 'POLICY_VIOLATION'
  | 'OTHER';
