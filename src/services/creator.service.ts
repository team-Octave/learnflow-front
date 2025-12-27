import { BasicInfo, CurriculumFormValues } from '@/features/creator/types';
import { authFetch } from '@/shared/api';

export async function getCreatorLectures() {
  const response = await authFetch(`/api/v1/lectures/my`);
  return response.json();
}

export async function deleteCreatorLecture(id: number) {
  const response = await authFetch(`/api/v1/lectures/${id}`, {
    method: 'DELETE',
  });
  return response.json();
}

export async function publishCreatorLecture(id: number) {
  const response = await authFetch(`/api/v1/lectures/${id}/publish`, {
    method: 'PUT',
  });
  return response.json();
}

export async function createBasicLecture(payload: Omit<BasicInfo, 'file'>) {
  const response = await authFetch(`/api/v1/lectures`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  return response.json();
}

export async function uploadThumbnail(formData: FormData) {
  const response = await authFetch(`/api/v1/contents/upload-thumbnail`, {
    method: 'POST',
    body: formData,
  });
  return response.json();
}

export async function createCurriculum(
  lectureId: string,
  curriculum: CurriculumFormValues,
) {
  const response = await authFetch(`/api/v1/lectures/${lectureId}/curriculum`, {
    method: 'POST',
    body: JSON.stringify(curriculum),
  });
  return response.json();
}
