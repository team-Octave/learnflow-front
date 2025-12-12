// src/app/play/[lectureId]/[lessonId]/page.tsx

import { notFound } from 'next/navigation';
import { getLectureById } from '@/services/lectures.service';
import { getLearningProgress } from '@/services/learning.service';
import { TitleBar } from '@/features/learning/components/play/TitleBar';
import { Video } from '@/features/learning/components/play/Video';
import { Quiz } from '@/features/learning/components/play/Quiz';
import { AsideCurriculum } from '@/features/learning/components/play/AsideCurriculum';

interface PlayPageProps {
  params: Promise<{ lectureId: string; lessonId: string }>;
}

// 강의 수강 페이지 (SERVER COMPONENT)
export default async function PlayPage({ params }: PlayPageProps) {
  const { lectureId, lessonId } = await params;

  // 1) 강의 정보 가져오기
  //    (기본정보 + 커리큘럼 + 각 레슨 완료 여부 + lastCompletedLessonId 등 포함)
  const lecture = await getLectureById(lectureId);

  if (!lecture) {
    return notFound();
  }

  // 2) 전체 레슨을 flat 구조로 변환
  const allLessons =
    lecture.curriculum?.flatMap((chapter) => chapter.lessons) ?? [];

  if (allLessons.length === 0) {
    return notFound();
  }

  // 3) URL의 lessonId와 일치하는 레슨 찾기
  const currentLesson =
    allLessons.find((lesson) => lesson.id === lessonId) ?? null;

  if (!currentLesson) {
    // lessonId가 실제 존재하지 않는 경우
    return notFound();
  }

  // 4) 비디오 / 퀴즈 타입 분기
  const isVideoLesson = currentLesson.type === 'VIDEO';
  // const isQuizLesson = currentLesson.type === 'QUIZ';

  // 5) 학습 진행 정보 (더미 or API)
  //    나중에 필요하면 getLearningProgress로 변경 가능
  // -----------------------------------
  // const progress = {
  //   progressRate: lecture.progressRate ?? 0,
  //   lastCompletedLessonId: lecture.lastCompletedLessonId,
  // };

  // 6) 실제 UI 렌더링
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* 상단 타이틀 바 */}
      <TitleBar lecture={lecture} />

      <div className="flex flex-1  mx-auto w-full">
        {/* 메인 영역 */}
        <main className="flex-1 flex items-center">
          {isVideoLesson ? (
            <Video lesson={currentLesson} />
          ) : (
            <Quiz lesson={currentLesson} />
          )}
        </main>

        {/* 오른쪽 사이드 커리큘럼 */}
        <AsideCurriculum
          lecture={lecture}
          currentLessonId={currentLesson.id}
          // progressRate={progress.progressRate}
          progressRate={10}
        />
      </div>
    </div>
  );
}
