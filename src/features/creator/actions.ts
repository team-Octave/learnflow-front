'use server';

import {
  bindCurriculum,
  completeVideoUpload,
  createBasicLecture,
  createChapter,
  createCurriculum,
  createLesson,
  deleteChapter,
  deleteCreatorLecture,
  deleteLesson,
  getCreatorLectures,
  getVideoUploadUrl,
  publishCreatorLecture,
  updateBasicLecture,
  updateChapter,
  updateLesson,
  uploadThumbnail,
} from '@/services/creator.service';
import { CreatorLesson, CurriculumFormValues } from './types';
import { Category, Level, Payment } from '../lectures/types';
import { ActionState } from '@/shared/types/ActionState';

export async function getCreatorLecturesAction(
  page: number,
): Promise<ActionState<any>> {
  const state = await getCreatorLectures(page);
  return state;
}

export async function deleteCreatorLectureAction(
  id: number,
): Promise<ActionState<any>> {
  const state = await deleteCreatorLecture(id);
  return state;
}

export async function publishCreatorLectureAction(
  id: number,
): Promise<ActionState<any>> {
  const state = await publishCreatorLecture(id);
  return state;
}

// 강의 기본 정보 등록
export async function createBasicLectureAction(
  formData: FormData,
): Promise<ActionState<any>> {
  // 1. 썸네일 등록
  const file = formData.get('file') as File;
  const thumbnailFormData = new FormData();
  thumbnailFormData.append('file', file);
  const thumbnailState = await uploadThumbnail(thumbnailFormData);
  // 썸네일 등록 실패시 바로 리턴
  if (!thumbnailState.success) {
    return thumbnailState;
  }

  // 2. 강의 기본정보 등록
  const title = formData.get('title') as string;
  const categoryId = formData.get('categoryId') as Category;
  const level = formData.get('level') as Level;
  const description = formData.get('description') as string;
  const paymentType = formData.get('paymentType') as Payment;
  const thumbnailUrl = thumbnailState.data.uploadUrl;

  const payload = {
    title,
    categoryId,
    level,
    description,
    paymentType,
    thumbnailUrl,
  };

  const state = await createBasicLecture(payload);
  return state;
}

// 강의 기본 정보 수정
export async function updateBasicLectureAction(
  lectureId: number,
  formData: FormData,
): Promise<ActionState<any>> {
  const title = formData.get('title') as string;
  const categoryId = formData.get('categoryId') as Category;
  const level = formData.get('level') as Level;
  const description = formData.get('description') as string;
  const paymentType = formData.get('paymentType') as Payment;
  const file = formData.get('file') as File | null;

  // 썸네일이 변경된 경우에만 업로드
  let thumbnailUrl: string | undefined;
  if (file) {
    const thumbnailFormData = new FormData();
    thumbnailFormData.append('file', file);
    const thumbnailState = await uploadThumbnail(thumbnailFormData);
    if (!thumbnailState.success) {
      return thumbnailState;
    }
    thumbnailUrl = thumbnailState.data.uploadUrl;
  }

  const payload: any = {
    title,
    categoryId,
    level,
    description,
    paymentType,
  };

  // 썸네일이 변경된 경우에만 포함
  if (thumbnailUrl) {
    payload.thumbnailUrl = thumbnailUrl;
  }

  const state = await updateBasicLecture(lectureId, payload);

  return state;
}

export async function createCurriculumAction(
  lectureId: number,
  curriculum: CurriculumFormValues,
): Promise<ActionState<any>> {
  const state = await createCurriculum(lectureId, curriculum);
  return state;
}

// ------------------------------- 커리큘럼 등록 세분화 API ---------------------------------

// 챕터 생성
export async function createChapterAction(
  lectureId: number,
  payload: { chapterTitle: string },
) {
  const state = await createChapter(lectureId, payload);
  return state;
}
// 챕터 수정
export async function updateChapterAction(
  lectureId: number,
  chapterId: number,
  payload: { chapterTitle: string },
) {
  const state = await updateChapter(lectureId, chapterId, payload);
  return state;
}

// 챕터 삭제
export async function deleteChapterAction(
  lectureId: number,
  chapterId: number,
) {
  const state = await deleteChapter(lectureId, chapterId);
  return state;
}

// 레슨 생성
export async function createLessonAction(
  lectureId: number,
  chapterId: number,
  payload: CreatorLesson,
) {
  const state = await createLesson(lectureId, chapterId, payload);
  return state;
}

// 레슨 수정
export async function updateLessonAction(
  lectureId: number,
  lessonId: number,
  payload: CreatorLesson,
) {
  const state = await updateLesson(lectureId, lessonId, payload);
  return state;
}

// 레슨 삭제
export async function deleteLessonAction(lectureId: number, lessonId: number) {
  const state = await deleteLesson(lectureId, lessonId);
  return state;
}

// 커리큘럼 순서 확정(최종 등록)
export async function bindCurriculumAction(lectureId: number, payload: any) {
  const state = await bindCurriculum(lectureId, payload);
  return state;
}

// 비디오 업로드용 Signed URL 발급
export async function getVideoUploadUrlAction(params: {
  filename: string;
}): Promise<
  ActionState<{
    mediaId: number;
    uploadUrl: string;
  }>
> {
  const state = await getVideoUploadUrl(params);
  return state;
}

export async function completeVideoUploadAction(params: {
  mediaId: number;
  durationSec: number;
}) {
  const state = await completeVideoUpload(params);
  return state;
}
