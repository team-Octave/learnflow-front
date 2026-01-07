'use server';
// src/features/lectures/actions.ts
// 강의 및 리뷰 관련 액션 함수 모음

import {
  getLectureById,
  getLectures,
  getReviewById,
} from '@/services/lectures.service';
import type { Query } from './types';
import { ActionState } from '@/shared/types/ActionState';

export async function getLecturesAction(
  query: Query,
): Promise<ActionState<any>> {
  const state = await getLectures(query);
  return state;
}
/*
[입력]
lectureId (number)

[처리]
getLectureById 호출

[출력]
ActionState<any>
*/

// lectureId를 받아서=>  실제 로직 함수(getLectureById)를 호출하고 => 그 결과를 그대로 반환
export async function getLectureByIdAction(
  lectureId: number, //강의의 고유 ID => 반드시 숫자만 허용
  // 최종 결과는 ActionState<any> 형태
): Promise<ActionState<any>> {
  // 이 함수는 즉시 값이 아니라 Promise를 반환

  //2단계: 내부에서 비동기 로직 실행
  const state = await getLectureById(lectureId); // getLectureById 실제 로직을 감싸는 액션 함수
  // getLectureById 서버 요청(DB 조회, API 호출 등)을 하는 실제 비즈니스 로직
  // Promise를 반환하는 비동기 함수

  return state; //3단계: 결과 그대로 반환
}

export async function getReviewByIdAction(
  lectureId: number,
  page: number,
): Promise<ActionState<any>> {
  const state = await getReviewById(lectureId, page);
  return state;
}
