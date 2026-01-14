'use server';

import {
  createBasicLecture,
  createCurriculum,
  deleteCreatorLecture,
  getCreatorLectures,
  publishCreatorLecture,
  uploadThumbnail,
} from '@/services/creator.service';
import { CreatorLecture, CurriculumFormValues } from './types';
import { Category, Lecture, Level } from '../lectures/types';
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
  const uploadUrl = thumbnailState.data.uploadUrl;

  const payload = {
    title,
    categoryId,
    level,
    description,
    uploadUrl,
  };

  const state = await createBasicLecture(payload);
  return state;
}

export async function createCurriculumAction(
  lectureId: string,
  curriculum: CurriculumFormValues,
): Promise<ActionState<any>> {
  const state = await createCurriculum(lectureId, curriculum);
  return state;
}
