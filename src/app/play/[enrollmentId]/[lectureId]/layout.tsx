// 강의 및 수강 정보 호출 (여기서 호출하면 lessonId가 바뀌어도 재호출 안 됨)
// parseInt 그대로 인라인 => number 사용x
/*
 * Provider로 감싸기 하지말것
 * 새파일 만들지 말것
 * parseint 그대로 갈것 (number 사용 x )
 * NaN 체크/유효성 체크 안함
 */

// app/play/[enrollmentId]/[lectureId]/layout.tsx
import type { ReactNode } from 'react';
import { notFound, redirect } from 'next/navigation';

import { getEnrollmentByIdAction } from '@/features/learning/actions';
import { getLectureByIdAction } from '@/features/lectures/actions';

import type { Enrollment } from '@/features/learning/types';
import type { Lecture } from '@/features/lectures/types';

import { TitleBar } from '@/features/learning/components/play/TitleBar';
import { AsideCurriculum } from '@/features/learning/components/play/AsideCurriculum';

interface PlayLayoutProps {
  params: Promise<{ enrollmentId: string; lectureId: string }>;
  children: ReactNode;
}

export default async function PlayLayout({
  params,
  children,
}: PlayLayoutProps) {
  const { enrollmentId, lectureId } = await params;

  if (!enrollmentId || !lectureId) {
    redirect('/mylearning');
  }

  const [enrollmentState, lectureState] = await Promise.all([
    getEnrollmentByIdAction(parseInt(enrollmentId)),
    getLectureByIdAction(parseInt(lectureId)),
  ]);

  if (!enrollmentState.success) {
    console.error(
      '[PlayLayout] enrollment load failed:',
      enrollmentState.message,
    );
    redirect('/mylearning');
  }

  if (!lectureState.success) {
    console.error('[PlayLayout] lecture load failed:', lectureState.message);
    return notFound();
  }

  const enrollmentInfo = enrollmentState.data as Enrollment;
  const lecture = lectureState.data as Lecture;

  if (!lecture.chapters || lecture.chapters.length === 0) {
    redirect('/mylearning');
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <TitleBar lectureTitle={lecture.title} />

      <div className="flex flex-1 mx-auto w-full">
        {children}
        <AsideCurriculum lecture={lecture} enrollmentInfo={enrollmentInfo} />
      </div>
    </div>
  );
}
