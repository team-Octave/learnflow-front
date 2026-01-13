// src/features/audit/types.ts

<<<<<<< HEAD
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
=======
export interface AuditRejectPayload {
  reasons: string[];
  detail?: string;
}

>>>>>>> af44723427c8f7eb06c3209a7b0647a2b17d4f6b
