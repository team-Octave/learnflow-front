// src/features/audit/mocks/mockAuditDetail.ts
import type { Lecture } from '@/features/lectures/types';

export const mockAuditDetail: Lecture = {
  id: '8',
  title: '테스트 강의 1',
  description: 'Spring Boot를 처음부터 끝까지 배우는 강의입니다.',
  categoryId: '1',
  level: 'ADVANCED',
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
          videoUrl: null,
          quizQuestions: null,
        },
        {
          id: '15',
          lessonTitle: 'Lesson 2: 개발 환경 설정',
          lessonTypeDisplayName: 'VIDEO',
          lessonOrder: 1,
          isFreePreview: false,
          videoUrl: null,
          quizQuestions: null,
        },
        {
          id: '17',
          lessonTitle: 'Quiz 1: Spring Boot 기초 확인',
          lessonTypeDisplayName: 'QUIZ',
          lessonOrder: 2,
          isFreePreview: false,
          videoUrl: null,
          quizQuestions: [
            {
              id: 'q1',
              question: 'Spring Boot는 설정을 최소화하여 빠른 개발을 돕는다.',
              correct: true,
              questionOrder: 0,
            },
            {
              id: 'q2',
              question: 'Spring Boot는 XML 설정만을 사용해야 한다.',
              correct: false,
              questionOrder: 1,
            },
          ],
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
          videoUrl: null,
          quizQuestions: null,
        },
      ],
    },
  ],
};
