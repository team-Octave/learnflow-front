'use server';

import {
  deleteCreatorLecture,
  getCreatorLectures,
  publishCreatorLecture,
} from '@/services/creator.service';
import { CreatorLecture } from './types';

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
