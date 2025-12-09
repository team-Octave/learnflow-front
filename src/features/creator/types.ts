export interface CreatorLecture {
  lectureId: string;
  lectureTitle: string;
  category: 'FRONTEND' | 'BACKEND' | 'AI' | 'GAME';
  status: boolean;
  enrollmentCount: number;
  rating: number;
}
