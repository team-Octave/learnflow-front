// src/app/play/[id]/page.tsx
import { notFound } from 'next/navigation';
import {
  getLectureById,
  getLearningProgress,
} from '@/services/lectures.service';

import { TitleBar } from '@/features/learning/components/play/TitleBar';
import { Video } from '@/features/learning/components/play/Video';
import { Quiz } from '@/features/learning/components/play/Quiz';
import { AsideCurriculum } from '@/features/learning/components/play/AsideCurriculum';

// interface PlayPageProps {
//   params: { id: string };
// }
interface PlayPageProps {
  params: Promise<{ id: string }>;
}

// 강의 수강 페이지
export default async function PlayPage({ params }: PlayPageProps) {
  const { id } = await params;

  // 1) 강의 데이터 가져오기 (나중엔 learning.service로 대체 예정)
  const lecture = getLectureById(id); // ✅ await 추가

  if (!lecture) {
    notFound(); //
  }

  // 2) 학습 진행 데이터 (더미)
  const progress = await getLearningProgress(id); // ✅ await 추가
  // progress = { lastCompletedLessonId: string, progressRate: number }

  // 3) 현재 강의의 모든 레슨(flat)
  const allLessons = lecture.curriculum?.flatMap((ch) => ch.lessons) ?? [];

  if (allLessons.length === 0) {
    return notFound();
  }

  // 4) 기본: 첫 번째 레슨
  let currentLesson = allLessons[0];

  // 5) 이어보기: lastCompletedLessonId로 현재 레슨 지정
  //    - 요구사항: "가장 마지막 완료된 레슨"을 현재 레슨으로
  if (progress?.lastCompletedLessonId) {
    const found = allLessons.find(
      (lesson) => lesson.id === progress.lastCompletedLessonId,
    );
    if (found) {
      currentLesson = found;
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* 상단 타이틀 바 */}
      <TitleBar lecture={lecture} />

      <div className="container mx-auto flex gap-8 py-8 px-4">
        {/* 메인 영역: 비디오 + 퀴즈 */}
        <main className="flex-1 flex flex-col gap-6">
          <Video lesson={currentLesson} />

          {currentLesson.questions && currentLesson.questions.length > 0 && (
            <Quiz lesson={currentLesson} />
          )}
        </main>

        {/* 오른쪽 사이드 커리큘럼 */}
        <aside className="w-[320px] shrink-0 hidden lg:block">
          <AsideCurriculum
            lecture={lecture}
            currentLessonId={currentLesson.id}
            progressRate={progress?.progressRate}
          />
        </aside>
      </div>
    </div>
  );
}
