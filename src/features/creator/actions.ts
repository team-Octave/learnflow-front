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
import { Action } from 'sonner';
import { Category, Lecture, Level } from '../lectures/types';

interface ActionState<T> {
  success: boolean;
  error?: string;
  data?: T;
}

export async function getCreatorLecturesAction(): Promise<
  ActionState<CreatorLecture[]>
> {
  try {
    const body = await getCreatorLectures();
    return {
      success: true,
      data: body.data.content,
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : '등록한 강의 목록 조회 실패',
    };
  }
}

export async function deleteCreatorLectureAction(
  id: number,
): Promise<ActionState<any>> {
  try {
    const body = await deleteCreatorLecture(id);
    return {
      success: true,
      data: body.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : '강의 삭제 실패',
    };
  }
}

export async function publishCreatorLectureAction(
  id: number,
): Promise<ActionState<any>> {
  try {
    const body = await publishCreatorLecture(id);
    return {
      success: true,
      data: body.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : '강의 공개 실패',
    };
  }
}

export async function createBasicLectureAction(
  formData: FormData,
): Promise<ActionState<Lecture>> {
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

  try {
    const body = await createBasicLecture(payload);

    const lecture = body.data as Lecture;
    const formData = new FormData();
    formData.append('lectureId', lecture.id);
    formData.append('file', file);
    await uploadThumbnail(formData);

    return {
      success: true,
      data: body.data,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : '강의 기본 정보 저장 실패',
    };
  }
}

export async function createCurriculumAction(
  lectureId: string,
  curriculum: CurriculumFormValues,
): Promise<ActionState<any>> {
  try {
    const body = await createCurriculum(lectureId, curriculum);
    return {
      success: true,
      data: body.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : '커리큘럼 등록 실패',
    };
  }
}
