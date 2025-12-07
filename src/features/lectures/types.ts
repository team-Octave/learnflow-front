export interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: 'video' | 'quiz';
  questions?: {
    id: string;
    question: string;
    answer: string;
  }[];
}

export interface Section {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Lecture {
  id: string;
  title: string;
  instructor: string;
  price: number;
  rating: number;
  studentCount: number;
  thumbnail: string;
  category: string;
  difficulty: string;
  createdAt: string;
  description: string;
  curriculum: Section[];
}
