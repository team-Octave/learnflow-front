// src/features/audit/mocks/mockAuditDetail.ts
import type { Lecture } from '@/features/lectures/types';

export const mockAuditDetail: Lecture = {
  id: '8',
  title: '테스트 강의 1',
  description: 'Spring Boot를 처음부터 끝까지 배우는 강의입니다.',
  categoryId: '1',
  level: 'BEGINNER',
  instructorId: '33fbee8e-9dd8-4fc3-9f6c-77187a2d4994',
  instructorDisplayName: '세윤',
  createdAt: '2025-12-12T05:38:36.381986Z',
  ratingAverage: 4.0,
  enrollmentCount: 8,
  thumbnailUrl:
    'https://storage.googleapis.com/learnflow-file-storage/thumbnails/lecture-8-438ffa2a-0015-4198-a21d-d1d97a8d3d1c.jpg',
  chapters: [
    {
      id: '9',
      chapterTitle: 'Chapter 1: Spring Boot 소개',
      lessons: [
        {
          id: '14',
          lessonTitle: 'Lesson 1: Spring Boot란?',
          lessonTypeDisplayName: 'VIDEO',
          lessonOrder: 0,
          isFreePreview: true,
          quizQuestions: null,
        },
        {
          id: '15',
          lessonTitle: 'Lesson 2: 개발 환경 설정',
          lessonTypeDisplayName: 'VIDEO',
          lessonOrder: 1,
          isFreePreview: false,
          quizQuestions: null,
        },
      ],
    },
    {
      id: '10',
      chapterTitle: 'Chapter 2: 기본 개념',
      lessons: [
        {
          id: '16',
          lessonTitle: 'Lesson 1: 의존성 주입',
          lessonTypeDisplayName: 'VIDEO',
          lessonOrder: 0,
          isFreePreview: false,
          quizQuestions: null,
        },
      ],
    },
  ],
};
