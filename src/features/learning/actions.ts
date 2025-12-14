'use server';

import {
  completeLesson,
  deleteReview,
  enrollLecture,
  getEnrollmentById,
  getLearningLectures,
  writeReview,
} from '@/services/learning.service';
import { Enrollment, LearningLecture, ReviewRequest } from './types';
import { revalidatePath } from 'next/cache';

interface ActionState<T> {
  success: boolean;
  error?: string;
  data?: T;
}

export async function enrollLectureAction(
  lectureId: number,
): Promise<ActionState<any>> {
  try {
    const body = await enrollLecture(lectureId);
    return { success: true, data: body.data };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : '수강 신청 실패',
    };
  }
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

export async function getEnrollmentByIdAction(
  enrollmentId: number,
): Promise<ActionState<Enrollment>> {
  try {
    const body = await getEnrollmentById(enrollmentId);
    return {
      success: true,
      data: body.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : '수강 정보 조회 실패',
    };
  }
}

export async function completeLessonAction(
  enrollmentId: number,
  lessonId: number,
): Promise<ActionState<any>> {
  try {
    const body = await completeLesson(enrollmentId, lessonId);
    return {
      success: true,
      data: body.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : '수강 완료 처리 실패',
    };
  }
}
