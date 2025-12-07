// lxp3/src/features/lectures/types.ts

// 강의 난이도 레벨
export type Level = 'beginner' | 'intermediate' | 'advanced';

// 레슨 타입 (영상 또는 퀴즈)
export type LessonType = 'video' | 'quiz';

// O/X 퀴즈 문제
export interface Question {
  id: string;
  question: string;
  answer: 'O' | 'X'; //  // 프론트에서 <input type="radio" /> 두 개를 만들어서 값(value)을 'O'와 'X'로 설정
}

// 레슨 단위 (영상 또는 퀴즈)
export interface Lesson {
  id: string;
  title: string;
  duration: string; // "00:00" 형식
  type: LessonType;
  // ? 즉, 이 레슨에는 questions가 있을 수도 있고, 없을 수도 있다
  // 이 레슨이 퀴즈라면, 여러 Question 객체를 배열로 담을 수 있다. 영상 레슨이면 이 속성은 없어도 된다
  questions?: Question[]; // questions?: Question[] 는 퀴즈 레슨일 때만 들어가는 문제 목록
}

// 챕터 단위 (레슨 여러 개 포함)
export interface Chapter {
  id: string;
  title: string; // ex: "챕터 1: Next.js 소개"
  lessons: Lesson[];
}

// 강의 단위
export interface Lecture {
  id: string;
  title: string;
  instructor: string;
  price: number;
  rating: number; // 5점 만점
  studentCount: number;
  thumbnail: string;
  category: string;
  level: Level;
  createdAt: string;
  description: string;
  curriculum: Chapter[]; // 챕터 단위로 구성
}

// 내 학습 정보
// export interface MyLearning {
//   lectureId: string;
//   progress: number; // 0 ~ 100 %
//   lastPlayedLessonId: string;
//   status: 'in-progress' | 'completed';
// }

// 리뷰
export interface Review {
  id: string;
  lectureId: string;
  userId: string;
  userName: string;
  rating: number;
  date: string;
  content: string;
}
