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

export async function getCreatorLecturesAction(): Promise<
  ActionState<CreatorLecture[]>
> {
  const state = await getCreatorLectures();
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

// 우선 두 개의 state를 return 하도록 구현
export async function createBasicLectureAction(
  formData: FormData,
): Promise<ActionState<any>> {
  const title = formData.get('title') as string;
  const categoryId = formData.get('categoryId') as Category;
  const level = formData.get('level') as Level;
  const description = formData.get('description') as string;
  const file = formData.get('file') as File;

  const payload = {
    title,
    categoryId,
    level,
    description,
  };

  // 강의 기본 정보로 먼저 등록하고, ID를 가져옴
  const state = await createBasicLecture(payload);

  const lecture = state.data as Lecture;
  const thumbnailFormData = new FormData();
  thumbnailFormData.append('lectureId', lecture.id);
  thumbnailFormData.append('file', file);
  // 등록된 ID로 썸네일 등록 API 호출
  const thumbnailState = await uploadThumbnail(thumbnailFormData);

  return state;
}

export async function createCurriculumAction(
  lectureId: string,
  curriculum: CurriculumFormValues,
): Promise<ActionState<any>> {
  const state = await createCurriculum(lectureId, curriculum);
  return state;
}
