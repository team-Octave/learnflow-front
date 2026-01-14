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

export default async function PlayLayout({params,children,}: PlayLayoutProps) {
  const { enrollmentId, lectureId } = await params;

  // URL이 깨졌거나 직접 접근했을 경우 강제적으로 내 학습 페이지로 돌림
  if (!enrollmentId || !lectureId) {
    redirect('/mylearning');
  }

  // 강의 및 수강 정보 호출 (lessonId 변경 시 재호출 안 됨)
  // 수강 정보 조회랑 강의 정보 조회를 동시에 요청해서, 둘 다 끝나면 결과를 각각 enrollmentState, lectureState에 담는다
  const [enrollmentState, lectureState] = await Promise.all([
    //Promise.all여러 비동기 작업을 동시에 실행하고, 모두 끝나면 결과를 한 번에 받는 것
    getEnrollmentByIdAction(parseInt(enrollmentId)), // parseInt(enrollmentId) : URL params는 무조건 string API는 number를 기대함
    getLectureByIdAction(parseInt(lectureId)),
  ]);

  // 수강 정보 실패 → mylearning 이동
  if (!enrollmentState.success) {
    console.error(
      '[PlayLayout] enrollment load failed:',
      enrollmentState.message,
    );
    redirect('/mylearning');
  }

  // 강의 정보 실패 → 404
  if (!lectureState.success) {
    console.error('[PlayLayout] lecture load failed:', lectureState.message);
    return notFound();
  }

  // 데이터 확정
  const enrollmentInfo = enrollmentState.data as Enrollment;
  const lecture = lectureState.data as Lecture;

  // 커리큘럼 없으면 접근 차단
  if (!lecture.chapters || lecture.chapters.length === 0) {
    redirect('/mylearning');
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <TitleBar lectureTitle={lecture.title} />

      <div className="flex flex-1 mx-auto w-full">
        {/* 실제 레슨 영상 / 퀴즈 페이지 (page.tsx) */}
        {children}

        {/* 사이드는 layout에서 고정 렌더링 */}
        <AsideCurriculum lecture={lecture} enrollmentInfo={enrollmentInfo} />
      </div>
    </div>
  );
}
