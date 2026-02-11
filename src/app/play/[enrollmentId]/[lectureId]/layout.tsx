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
  // 1️ URL 파라미터 꺼내기  URL 구조:/play/[enrollmentId]/[lectureId]
  const { enrollmentId, lectureId } = await params;

  // 2 학습 페이지 접근 불가 → 내 학습 목록으로 돌려보냄
  if (!enrollmentId || !lectureId) {
    redirect('/mylearning');
  }

  // 3 수강 정보 + 강의 정보 동시 호출
  const [enrollmentState, lectureState] = await Promise.all([
    //Promise.all([A, B]) A, B 동시에 실행
    getEnrollmentByIdAction(parseInt(enrollmentId)), //현재 로그인한 사용자의 수강 정보 조회  getEnrollmentByIdAction(33)
    getLectureByIdAction(parseInt(lectureId)), //강의 상세 정보 조회 getLectureByIdAction(65)
  ]);
  /*
      ① parseInt(enrollmentId)
    URL 파라미터는 무조건 string
    API 액션은 number 타입 ID를 기대
    "33" → 33
    */

  // 4 수강 정보 실패 시 => redirect 학습 페이지 접근 차단
  if (!enrollmentState.success) {
    console.error(
      '[PlayLayout] enrollment load failed:',
      enrollmentState.message,
    );
    redirect('/mylearning');
  }

  // 5 강의 정보 실패 시 → notFound 404 페이지 노출
  if (!lectureState.success) {
    console.error('[PlayLayout] lecture load failed:', lectureState.message);
    return notFound();
  }

  // 6 실제 데이터 꺼내기
  /*
    API 응답에서 data만 사용
    타입 단언으로 컴포넌트에 전달
  */
  // 이 두 줄은 서버에서 받아온 unknown 데이터를 앱 내부에서 쓰는 ‘확정 타입’으로 변환하는 경계선
  const enrollmentInfo = enrollmentState.data as Enrollment;
  const lecture = lectureState.data as Lecture;

  // 7 챕터 없는 강의 방어
  // 커리큘럼이 없는 강의는 → 내 학습 목록으로 이동
  if (!lecture.chapters || lecture.chapters.length === 0) {
    redirect('/mylearning');
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <TitleBar lectureTitle={lecture.title} />

      <main className="flex flex-1 mx-auto w-full">
        {children}
        <AsideCurriculum lecture={lecture} enrollmentInfo={enrollmentInfo} />
      </main>
    </div>
  );
}
