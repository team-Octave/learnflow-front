// src/services/lectures.service.ts
import type { Query } from '@/features/lectures/types';
import { commonFetch } from '@/shared/api';

export async function getLectures({ category, level, sort, page }: Query) {
  const url = `/api/v1/lectures?category=${category}&level=${level}&sort=${sort}&page=${
    page - 1
  }`;
  const response = await commonFetch(url);
  return response.json();
}

/*
전체 역할 요약
lectureId를 받아서👉 해당 강의 정보를 서버에서 가져오고👉 JSON 데이터로 반환하는 함수
*/

/*
📌 실행 순서:
getLectureById(1) 호출 => /api/v1/lectures/1 요청 => 서버 응답 수신 => JSON 파싱 => 강의 데이터 반환
*/
// 1️⃣ 함수 선언
export async function getLectureById(lectureId: number) {
  //강의 ID는 숫자 타입만 허용
  // 2️⃣ API URL 생성
  const url = `/api/v1/lectures/${lectureId}`;
  // 3️⃣ 서버 요청
  const response = await commonFetch(url); //commonFetch 보통 fetch를 감싼 공통 API 유틸 함수
  // 4️⃣ JSON 변환 후 반환
  return response.json();
  /*
  ?? @@  이게뭔소리 
  response.json()
→ 서버 응답 body를 JavaScript 객체로 변환

⚠️ response.json() 자체가 Promise

결국 이 함수의 반환 타입은:

Promise<any> (또는 강의 DTO 타입)
*/
}

export async function getReviewById(lectureId: number, page: number) {
  const response = await commonFetch(
    `/api/v1/reviews/lectures/${lectureId}?page=${
      page - 1
    }&size=3&sort=createdAt,desc`,
  );
  return response.json();
}
