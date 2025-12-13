export interface LearningLecture {
  lectureId: number;
  enrollmentId: number;
  reviewId: number | null;
  lectureThumbnail: string;
  lectureTitle: string;
  enrollmentStatus: 'IN_PROGRESS' | 'COMPLETED';
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
