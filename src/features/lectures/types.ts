// lxp3/src/features/lectures/types.ts

// 강의 난이도 레벨
export type Level = 'beginner' | 'intermediate' | 'advanced';

// 카테고리 타입 추가
export type Category = 'FRONTEND' | 'BACKEND' | 'AI' | 'GAME';

// 레슨 타입 (영상 또는 퀴즈)
export type LessonType = 'video' | 'quiz';

// O/X 퀴즈 문제
export interface Question {
  id: string;
  question: string;
  answer: 'O' | 'X';
}

// 레슨 단위 (영상 또는 퀴즈)
export interface Lesson {
  id: string;
  title: string;
  duration?: string; //  변경됨 — duration(영상 길이)”은 영상 레슨에만 필요하고, 퀴즈 레슨에는 필요 없으니까 선택적(optional)
  type: LessonType;
  questions?: Question[];
}

// 챕터 단위 (레슨 여러 개 포함)
export interface Chapter {
  id: string;
  title: string;
  lessons: Lesson[];
}

// 강의 단위
export interface Lecture {
  id: string;
  title: string;
  creatorId: string; // instructor → creatorName + creatorId 로 변경
  creatorName: string;
  price: number;
  rating: number;
  enrollmentCount: number; // / studentCount → enrollmentCount 변경됨
  thumbnail: string;
  category: Category; // Category 타입으로 변경
  level: Level;
  createdAt: string;
  updatedAt: string; //   updatedAt 추가
  description: string;
  curriculum: Chapter[];
}

// 리뷰
export interface Review {
  id: string;
  lectureId: string;
  userId: string;
  userName: string;
  rating: number;
  createdAt: string; // 🔄 변경됨 — date → createdAt
  content: string;
}
