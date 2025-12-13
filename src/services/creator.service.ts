import { authFetch } from '@/lib/api';

export async function getCreatorLectures() {
  const response = await authFetch(`/api/v1/lectures/my`);
  const data = await response.json();
  if (response.ok) {
    return data;
  } else {
    throw new Error(data.message || '등록한 강의 목록 조회 실패');
  }
}

export async function deleteCreatorLecture(id: number) {
  // 우선 주석 처리
  // const response = await authFetch(`/api/v1/lectures/my`, {
  //   method: 'POST',
  // });
  // const data = await response.json();
  // if (response.ok) {
  //   return data;
  // } else {
  //   throw new Error(data.message || '강의 삭제 실패');
  // }
}
