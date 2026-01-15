import {
  BasicInfo,
  CreatorLesson,
  CurriculumFormValues,
} from '@/features/creator/types';
import { authFetch } from '@/shared/api';

export async function getCreatorLectures(page: number) {
  const response = await authFetch(`/api/v1/lectures/my?page=${page - 1}`);
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

// ------------------------------- 커리큘럼 등록 세분화 API ---------------------------------

export async function createChapter(
  lectureId: string,
  payload: { chapterTitle: string },
) {
  const response = await authFetch(`/api/v2/lectures/${lectureId}/chapters`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  return response.json();
}

export async function updateChapter(
  lectureId: string,
  chapterId: string,
  payload: { chapterTitle: string },
) {
  const response = await authFetch(
    `/api/v2/lectures/${lectureId}/chapters/${chapterId}`,
    {
      method: 'PATCH',
      body: JSON.stringify(payload),
    },
  );
  return response.json();
}

export async function deleteChapter(lectureId: string, chapterId: string) {
  const response = await authFetch(
    `/api/v2/lectures/${lectureId}/chapters/${chapterId}`,
    {
      method: 'DELETE',
    },
  );
  return response.json();
}

export async function createLesson(
  lectureId: string,
  chapterId: string,
  payload: CreatorLesson,
) {
  const response = await authFetch(
    `/api/v2/lectures/${lectureId}/chapters/${chapterId}/lessons`,
    {
      method: 'POST',
      body: JSON.stringify(payload),
    },
  );
  return response.json();
}

export async function updateLesson(
  lectureId: string,
  chapterId: string,
  lessonId: string,
  payload: any,
) {
  const response = await authFetch(
    `/api/v2/lectures/${lectureId}/chapters/${chapterId}/lessons/${lessonId}`,
    {
      method: 'PATCH',
      body: JSON.stringify(payload),
    },
  );
  return response.json();
}

export async function deleteLesson(
  lectureId: string,
  chapterId: string,
  lessonId: string,
) {
  const response = await authFetch(
    `/api/v2/lectures/${lectureId}/chapters/${chapterId}/lessons/${lessonId}`,
    {
      method: 'DELETE',
    },
  );
  return response.json();
}

// 커리큘럼 순서 확정
export async function bindCurriculum(lectureId: string, payload: any) {
  const response = await authFetch(
    `/api/v2/lectures/${lectureId}/curriculum/bind`,
    {
      method: 'PUT',
      body: JSON.stringify(payload),
    },
  );
  return response.json();
}

// 비디오 업로드용 Signed URL 발급
export async function getVideoUploadUrl(params: {
  filename: string;
  contentType: string;
  filesize: number;
}) {
  const response = await authFetch(`/api/v1/contents/upload-video-init`, {
    method: 'POST',
    body: JSON.stringify(params),
  });
  return response.json();
}
