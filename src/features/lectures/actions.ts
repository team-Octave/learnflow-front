// src/features/lectures/actions.ts
// 강의 및 리뷰 관련 액션 함수 모음

'use server';

import {
  getLectureById,
  getLectures,
  getReviewById,
  getLessonById,
} from '@/services/lectures.service';

import type { Query } from './types';
import type { ActionState } from '@/shared/types/ActionState';

export async function getLecturesAction(
  query: Query,
): Promise<ActionState<any>> {
  const state = await getLectures(query);
  return state;
}

// 강의 ID를 받아서 해당 강의 정보를 비동기로 가져온 뒤 그대로 반환하는 함수
export async function getLectureByIdAction( // Promise가 resolve되면 결과 타입은 ActionState<any>
  lectureId: number,
): Promise<ActionState<any>> {
  return {
    success: true,
    code: 'SUCCESS',
    data: {
      id: 1,
      title: '프론트엔드 입문자를 위한 React 기초',
      instructorId: 'instructor_001',
      instructorDisplayName: '김코딩',
      ratingAverage: 4.7,
      enrollmentCount: 1240,
      thumbnailUrl: 'https://example.com/thumbnails/react-basic.png',
      categoryId: '1',
      level: 'BEGINNER',
      createdAt: '2025-01-10T09:00:00Z',
      updatedAt: '2025-01-20T09:00:00Z',
      description: 'React를 처음 시작하는 분들을 위한 기초 강의입니다.',
      chapters: [
        {
          id: 101,
          chapterTitle: 'React 시작하기',
          lessons: [
            {
              id: 1001,
              lessonTitle: 'React란 무엇인가?',
              isFreePreview: true,
              lessonOrder: 1,
              lessonTypeDisplayName: 'VIDEO',
              videoUrl: 'https://example.com/videos/react-intro.mp4',
              duration: '08:32',
              quizQuestions: null,
            },
            {
              id: 1002,
              lessonTitle: 'JSX 이해하기',
              isFreePreview: false,
              lessonOrder: 2,
              lessonTypeDisplayName: 'QUIZ',
              videoUrl: null,
              duration: null,
              quizQuestions: [
                {
                  id: 1,
                  question: 'JSX는 JavaScript 확장 문법이다.',
                  correct: true,
                  questionOrder: 1,
                },
                {
                  id: 2,
                  question: 'JSX는 브라우저에서 바로 실행된다.',
                  correct: false,
                  questionOrder: 2,
                },
              ],
            },
          ],
        },
      ],
      // ai요약추가
      aiLessonSummaries: [
        {
          lessonId: 1001, // VIDEO 레슨 id랑 매칭
          title: 'React란 무엇인가?',
          summary:
            '이 강의에서는 Next.js 14의 핵심 개념인 App Router와 Server Components에 대해 다룹니다. 또한 기존 Pages Router와의 차이점, 그리고 새로운 라우팅 시스템이 가져오는 성능상의 이점을 실습을 통해 상세히 알아봅니다.',
          keyTakeaways: [
            'App Router의 기본 구조 이해',
            'Server Actions를 활용한 데이터 처리',
            'Streaming과 Suspense 활용법',
          ],
        },
      ],
    },
  };
  const state = await getLectureById(lectureId);
  return state;
}

export async function getReviewByIdAction(
  lectureId: number,
  page: number,
): Promise<ActionState<any>> {
  return {
    success: true,
    code: 'SUCCESS',
    data: {
      contents: [],
    },
  };
  const state = await getReviewById(lectureId, page);
  return state;
}

/**
 * ✅ 레슨 단건 조회(V2)
 * GET /api/v2/lectures/{lectureId}/lessons/{lessonId}
 */
export async function getLessonByIdAction(
  lectureId: number,
  lessonId: number,
): Promise<ActionState<any>> {
  const state = await getLessonById(lectureId, lessonId);
  return state;
}

