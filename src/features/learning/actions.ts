'use server';

import {
  deleteReview,
  getLearningLectures,
  writeReview,
} from '@/services/learning.service';
import { LearningLecture, ReviewRequest } from './types';
import { revalidatePath } from 'next/cache';

interface ActionState<T> {
  success: boolean;
  error?: string;
  data?: T;
}

export async function getLearningLecturesAction(): Promise<
  ActionState<LearningLecture[]>
> {
  try {
    const body = await getLearningLectures();
    return {
      success: true,
      data: body.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : '내 학습 목록 조회 실패',
    };
  }
}

export async function writeReviewAction(
  review: ReviewRequest,
): Promise<ActionState<any>> {
  try {
    const body = await writeReview(review);
    revalidatePath('/mylearning');
    return {
      success: true,
      data: body.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : '리뷰 작성 실패',
    };
  }
}

export async function deleteReviewAction(
  reviewId: number,
): Promise<ActionState<any>> {
  try {
    const body = await deleteReview(reviewId);
    return {
      success: true,
      data: body.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : '리뷰 삭제 실패',
    };
  }
}
