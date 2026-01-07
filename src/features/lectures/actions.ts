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

// 강의 ID를 받아서 해당 강의 정보를 비동기로 가져온 뒤 그대로 반환하는 함수
export async function getLectureByIdAction(
  lectureId: number, //lectureId는 숫자 타입
): Promise<ActionState<any>> { //이 함수의 반환 타입
  // getLectureById 함수 호출
  const state = await getLectureById(lectureId); // getLectureById 실제 로직을 감싸는 액션 함수
  return state; //받아온 결과를 그대로 반환
}

export async function getReviewByIdAction(
  lectureId: number,
  page: number,
): Promise<ActionState<any>> {
  const state = await getReviewById(lectureId, page);
  return state;
}
