// src/app/play/[id]/page.tsx

import { notFound } from 'next/navigation';
import { getLectureById } from '@/services/learning.service';
import { TitleBar } from '@/features/learning/components/play/TitleBar';
import { Video } from '@/features/learning/components/play/Video';
import { Quiz } from '@/features/learning/components/play/Quiz';
import { AsideCurriculum } from '@/features/learning/components/play/AsideCurriculum';
import { AsideLesson } from '@/features/learning/components/play/AsideLesson';

export default async function PlayPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // 강의(lecture) 불러오기
  const lecture = getLectureById(id);

  if (!lecture) {
    notFound();
  }

  return (
    <div className="flex flex-col h-screen bg-zinc-950 text-zinc-50 overflow-hidden">

      {/* 상단 타이틀 바 */}
      <TitleBar lecture={lecture} />

      <div className="flex flex-1 overflow-hidden">
        {/* 메인 콘텐츠 (Video or Quiz) */}
        <main className="flex-1 flex flex-col bg-black relative">
          {/* 현재 레슨이 video인지 quiz인지에 따라 분기 */}
          {lecture.currentLesson?.type === 'QUIZ' ? (
            <Quiz lesson={lecture.currentLesson} />
          ) : (
            <Video lesson={lecture.currentLesson} />
          )}

          {/* 모바일 전용 하단 정보 */}
          <AsideLesson lecture={lecture} />
        </main>

        {/* 데스크탑 전용 사이드 커리큘럼 */}
        <AsideCurriculum lecture={lecture} />
      </div>
    </div>
  );
}
