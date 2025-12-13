import { BasicInfo } from '@/features/creator/types';
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

export async function createBasicLecture(payload: Omit<BasicInfo, 'file'>) {
  const response = await authFetch(`/api/v1/lectures`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  if (response.ok) {
    return data;
  } else {
    throw new Error(data.message || '강의 기본 정보 등록 실패');
  }
}

export async function uploadThumbnail(formData: FormData) {
  const response = await authFetch(`/api/v1/contents/upload-thumbnail`, {
    method: 'POST',
    body: formData,
  });
  const data = await response.json();
  if (response.ok) {
    return data;
  } else {
    throw new Error(data.message || '강의 썸네일 등록 실패');
  }
}
