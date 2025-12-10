export interface CreatorLecture {
  lectureId: string;
  lectureTitle: string;
  lectureDesctiption: string;
  category: 'FRONTEND' | 'BACKEND' | 'AI' | 'GAME';
  level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  thumbnailURL: string;
  status: boolean;
  enrollmentCount: number;
  rating: number;
  curriculum: Chapter[];
}

export interface Chapter {
  chapterId: string;
  chapterTitle: string;
  chapterOrder: number;
  lessons: Lesson[];
}

export interface Lesson {
  lessonId: string;
  lessonTitle: string;
  lessonOrder: number;
  lessonType: 'QUIZ' | 'VIDEO';
  videoURL?: string;
  questions?: Question[];
  duration?: string;
}

export interface Question {
  questionId?: string;
  questionText: string;
  questionOrder: number;
  answer: 'O' | 'X';
}
