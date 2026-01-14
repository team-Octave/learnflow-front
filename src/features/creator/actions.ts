'use server';

import {
  bindCurriculum,
  createBasicLecture,
  createChapter,
  createCurriculum,
  createLesson,
  deleteChapter,
  deleteCreatorLecture,
  deleteLesson,
  getCreatorLectures,
  publishCreatorLecture,
  updateChapter,
  updateLesson,
  uploadThumbnail,
} from '@/services/creator.service';
import { CreatorLesson, CurriculumFormValues } from './types';
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

// ------------------------------- 커리큘럼 등록 세분화 API ---------------------------------

// 챕터 생성
export async function createChapterAction(
  lectureId: string,
  payload: { chapterTitle: string },
) {
  const state = await createChapter(lectureId, payload);
  return state;
}
// 챕터 수정
export async function updateChapterAction(
  lectureId: string,
  chapterId: string,
  payload: { chapterTitle: string },
) {
  const state = await updateChapter(lectureId, chapterId, payload);
  return state;
}

// 챕터 삭제
export async function deleteChapterAction(
  lectureId: string,
  chapterId: string,
) {
  const state = await deleteChapter(lectureId, chapterId);
  return state;
}

// 레슨 생성
export async function createLessonAction(
  lectureId: string,
  chapterId: string,
  payload: CreatorLesson,
) {
  const state = await createLesson(lectureId, chapterId, payload);
  return state;
}

// 레슨 수정
export async function updateLessonAction(
  lectureId: string,
  chapterId: string,
  lessonId: string,
  payload: CreatorLesson,
) {
  const state = await updateLesson(lectureId, chapterId, lessonId, payload);
  return state;
}

// 레슨 삭제
export async function deleteLessonAction(
  lectureId: string,
  chapterId: string,
  lessonId: string,
) {
  const state = await deleteLesson(lectureId, chapterId, lessonId);
  return state;
}

// 커리큘럼 순서 확정(최종 등록)
export async function bindCurriculumAction(lectureId: string, payload: any) {
  const state = await bindCurriculum(lectureId, payload);
  return state;
}
