export interface LearningLecture {
  lectureId: number;
  enrollmentId: number;
  reviewId: number | null;
  lectureThumbnail: string;
  lectureTitle: string;
  enrollmentStatus: 'IN_PROGRESS' | 'COMPLETED';
  firstChapterId: number;
  firstLessonId: number;
  lastCompletedLessonChapterId: number | null;
  completedLessonIds: number[];
  progress: number;
  enrolledAt: string;
  updatedAt: string;
  reviewRating: number | null;
  reviewContent: string | null;
}

export type LearningSortOptions = 'RECENT-LEARNED' | 'RECEND-ENROLLED';

export interface ReviewRequest {
  lectureId: number;
  rating: number;
  content: string;
}
