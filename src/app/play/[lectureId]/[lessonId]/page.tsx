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
  params: Promise<{ lectureId: string; lessonId: string }>;
}

// 강의 수강 페이지
export default async function PlayPage({ params }: PlayPageProps) {
  const { lectureId, lessonId } = await params;

  // 1) 강의 데이터 가져오기 (나중엔 learning.service로 대체 예정)
  const lecture = getLectureById(id); //
  // 각레슨마다 완료되었는지도 넘어옴 -> 완료 체크 표시하는 용도
  // 같이 넘어옴 { lastCompletedLessonId: string, progressRate: number }

  if (!lecture) {
    notFound(); //
  }

  // lecture.lastComptedLesssonId = 20

  // 2) 학습 진행 데이터 (더미)
  // const progress = await getLearningProgress(lecture.lastCompletedLessonId); // ✅ await 추가
  // lastCompletedLessonId로 레슨 정보 조회

  // 3) 현재 강의의 모든 레슨(flat)
  const allLessons = lecture.curriculum?.flatMap((ch) => ch.lessons) ?? [];

  if (allLessons.length === 0) {
    return notFound();
  }

  // 4) 기본: 첫 번째 레슨
  let currentLesson = allLessons[0];

  // 5) 이어보기: lastCompletedLessonId로 현재 레슨 지정
  //    - 요구사항: "가장 마지막 완료된 레슨"을 현재 레슨으로
  // if (progress?.lastCompletedLessonId) {
  //   const found = allLessons.find(
  //     (lesson) => lesson.id === progress.lastCompletedLessonId,
  //   );
  //   if (found) {
  //     currentLesson = found;
  //   }
  // }

  const isVideoLesson = currentLesson.type === 'VIDEO';

  return (
    <div className="flex flex-col min-h-screen">
      {/* 상단 타이틀 바 */}
      <TitleBar lecture={lecture} />

      <div className="flex gap-8 flex-1">
        {/* 메인 영역: 비디오 + 퀴즈 */}
        <main className="flex-1 flex flex-col gap-6">
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
          progressRate={10}
        />
      </div>
    </div>
  );
}
