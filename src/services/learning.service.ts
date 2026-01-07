'use server';

import { ReviewRequest } from '@/features/learning/types';
import { authFetch } from '@/shared/api';

export async function enrollLecture(lectureId: number): Promise<any> {
  const response = await authFetch(`/api/v1/enrollment`, {
    method: 'POST',
    body: JSON.stringify({ lectureId }),
  });
  return response.json();
}

export async function getLearningLectures() {
  const response = await authFetch(`/api/v1/enrollment/my`);
  return response.json();
}

export async function writeReview(review: ReviewRequest) {
  const response = await authFetch(`/api/v1/reviews`, {
    method: 'POST',
    body: JSON.stringify(review),
  });
  return response.json();
}
export async function deleteReview(reviewId: number) {
  const response = await authFetch(`/api/v1/reviews/${reviewId}`, {
    method: 'DELETE',
  });
  return response.json();
}

// 수강 ID(enrollmentId)를 서버로 보내서 해당 수강 정보를 조회하는 비동기 함수
export async function getEnrollmentById(enrollmentId: number) {
  // enrollmentId: number 숫자 타입의 수강 ID만 허용
  //response 결과는 response 객체에 저장됨
  // authFetch 일반 fetch를 감싼 커스텀 함수
  const response = await authFetch(`/api/v1/enrollment/select-enrollment`, {
    method: 'POST', //HTTP 메서드: POST
    // 서버로 보낼 데이터
    body: JSON.stringify({ enrollmentId }), //{ enrollmentId: enrollmentId }를 JSON 문자열로 변환
  });
  return response.json(); //응답 데이터 반환 
}
/*
전체 코드 흐름 (순서)
getEnrollmentById(10) 호출
authFetch로 서버에 POST 요청 전송
URL: /api/v1/enrollment/select-enrollment
Body: { enrollmentId: 10 }
서버에서 수강 정보 조회
서버 응답 도착
response.json()으로 데이터 파싱
수강 정보 객체 반환
*/

export async function completeLesson(enrollmentId: number, lessonId: number) {
  console.log(enrollmentId, lessonId);
  const response = await authFetch(`/api/v1/enrollment/complete-lesson`, {
    method: 'POST',
    body: JSON.stringify({ enrollmentId, lessonId }),
  });
  return response.json();
}
