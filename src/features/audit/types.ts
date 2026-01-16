// src/features/audit/types.ts

export type AuditApprovalItem = {
  approvalId: number;
  lectureId: number;
  thumbnailUrl: string | null;
  lectureTitle: string;
  nickname: string;
  requestDate: string; // ISO string
  lectureStatus: string; // SUBMIT 등
};

export type AuditApprovalListApiResponse = {
  total: number;
  page: number; // 백엔드: page (0-based일 가능성 높음)
  size: number;
  approvals: AuditApprovalItem[];
};

// UI에서 쓰기 좋은 형태(기존 AuditTable 호환)
export type AuditLecture = {
  id: number; // lectureId로 사용
  title: string; // lectureTitle
  instructorNickname: string; // nickname
  thumbnailUrl: string | null;
  requestedAt: string; // requestDate
  approvalId?: number;
  lectureStatus?: string;
};

export type AuditLectureListResponse = {
  items: AuditLecture[];
  page: number; // 1-based
  pageSize: number;
  totalItems: number;
  totalPages: number;
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
  nickname: string;  //  강사(요청자) 닉네임
  level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  categoryId: number;
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

export type AuditActionState<T> =
  | { success: true; data: T }
  | { success: false; error: string };
