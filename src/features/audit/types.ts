// src/features/audit/types.ts

export type AuditLecture = {
  id: number;
  title: string;
  instructorNickname: string;
  thumbnailUrl: string | null;
  requestedAt: string; // ISO string
};

export type AuditLectureListResponse = {
  items: AuditLecture[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
};

export type AuditActionState<T> =
  | { success: true; data: T }
  | { success: false; error: string };
