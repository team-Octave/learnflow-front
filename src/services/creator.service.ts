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
  const response = await authFetch(`/api/v1/lectures/${id}`, {
    method: 'DELETE',
  });
  const data = await response.json();
  if (response.ok) {
    return data;
  } else {
    throw new Error(data.message || '강의 삭제 실패');
  }
}

export async function publishCreatorLecture(id: number) {
  const response = await authFetch(`/api/v1/lectures/${id}/publish`, {
    method: 'PUT',
  });
  const data = await response.json();
  if (response.ok) {
    return data;
  } else {
    throw new Error(data.message || '강의 공개 실패');
  }
}
