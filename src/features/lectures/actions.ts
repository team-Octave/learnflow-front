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
  // return {
  //   success: true,
  //   code: 'SUCCESS',
  //   data: {
  //     id: 1,
  //     title: '프론트엔드 입문자를 위한 React 기초',
  //     instructorId: 'instructor_001',
  //     instructorDisplayName: '김코딩',
  //     ratingAverage: 4.7,
  //     enrollmentCount: 1240,
  //     thumbnailUrl: 'https://example.com/thumbnails/react-basic.png',
  //     categoryId: '1',
  //     level: 'BEGINNER',
  //     createdAt: '2025-01-10T09:00:00Z',
  //     updatedAt: '2025-01-20T09:00:00Z',
  //     description: 'React를 처음 시작하는 분들을 위한 기초 강의입니다.',
  //     chapters: [
  //       {
  //         id: 101,
  //         chapterTitle: 'React 시작하기',
  //         lessons: [
  //           {
  //             id: 1001,
  //             lessonTitle: 'React란 무엇인가?',
  //             isFreePreview: true,
  //             lessonOrder: 1,
  //             lessonTypeDisplayName: 'VIDEO',
  //             videoUrl: 'https://example.com/videos/react-intro.mp4',
  //             duration: '08:32',
  //             quizQuestions: null,
  //           },
  //           {
  //             id: 1002,
  //             lessonTitle: 'JSX 이해하기',
  //             isFreePreview: false,
  //             lessonOrder: 2,
  //             lessonTypeDisplayName: 'QUIZ',
  //             videoUrl: null,
  //             duration: null,
  //             quizQuestions: [
  //               {
  //                 id: 1,
  //                 question: 'JSX는 JavaScript 확장 문법이다.',
  //                 correct: true,
  //                 questionOrder: 1,
  //               },
  //               {
  //                 id: 2,
  //                 question: 'JSX는 브라우저에서 바로 실행된다.',
  //                 correct: false,
  //                 questionOrder: 2,
  //               },
  //             ],
  //           },
  //         ],
  //       },
  //     ],
  //   },
  // };
  const state = await getLectureById(lectureId);
  return state;
}

export async function getReviewByIdAction(
  lectureId: number,
  page: number,
): Promise<ActionState<any>> {
  // return {
  //   success: true,
  //   code: 'SUCCESS',
  //   data: {
  //     contents: [],
  //   },
  // };
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

/**
 * AI 강의 요약 조회 (Mock)
 * GET /api/v2/lectures/{lectureId}/lessons/{lessonId}/ai-summary
 */
export async function getAiLessonSummaryAction(
  lectureId: number,
  lessonId: number,
): Promise<ActionState<any>> {
  // return {
  //   success: true,
  //   code: 'SUCCESS',
  //   data: {
  //     lectureId,
  //     lessonId,
  //     title: 'Next.js App Router 개요',
  //     summary:
  //       '이 강의에서는 Next.js 14의 핵심 기능인 App Router 구조를 중심으로 파일 기반 라우팅, 레이아웃 시스템, 그리고 기존 Pages Router와의 차이점을 설명합니다.',
  //     keyTakeaways: [
  //       'App Router 기본 폴더 구조 이해',
  //       'layout.tsx와 page.tsx 역할',
  //       'Pages Router와의 차이점',
  //     ],
  //   },
  // };

  // 실제 API 연동 시
  // const state = await getAiLessonSummary(lectureId, lessonId);
  // return state;
  return { success: false, code: 'NOT_IMPLEMENTED', data: null };
}
