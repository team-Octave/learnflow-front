
import { Chapter, Lecture, Lesson } from '@/features/lectures/types';
import { Enrollment } from '@/features/learning/types';
import { getLectureByIdAction } from '@/features/lectures/actions';
import { TitleBar } from '@/features/learning/components/play/TitleBar';
import { Video } from '@/features/learning/components/play/Video';
import { Quiz } from '@/features/learning/components/play/Quiz';
import { AsideCurriculum } from '@/features/learning/components/play/AsideCurriculum';
import { getEnrollmentByIdAction } from '@/features/learning/actions';
import { notFound, redirect } from 'next/navigation';

interface PlayPageProps {
  params: Promise<{ enrollmentId: string }>; // 수강 ID
  searchParams: Promise<{ lectureId: string; lessonId: string }>; // 강의 ID / 레슨 ID
}

// 강의 수강 페이지 (SERVER COMPONENT)
export default async function PlayPage({
  params,
  searchParams,
}: PlayPageProps) {
  const { enrollmentId } = await params;
  const { lectureId, lessonId } = await searchParams;

  // 리팩토링1) 서버 컴포넌트에서 alert() 사용 불가
  if (!enrollmentId || !lessonId || !lectureId) {
    redirect('/mylearning');
  }

  const [enrollmentState, lectureState] = await Promise.all([
    getEnrollmentByIdAction(parseInt(enrollmentId)),
    getLectureByIdAction(parseInt(lectureId)),
  ]);

  // 리팩토링 6) 데이터 로드 실패 처리: console.log 대신 notFound()/redirect() 분리 권장
  // 수강 정보 로딩 실패
  if (!enrollmentState.success) {
    console.error(
      '[PlayPage] enrollment load failed:',
      enrollmentState.message,
    );
    redirect('/mylearning');
  }

  // 강의 정보 로딩 실패
  if (!lectureState.success) {
    console.error('[PlayPage] lecture load failed:', lectureState.message);
    return notFound();
  }

  const enrollmentInfo = enrollmentState.data as Enrollment;
  const lecture = lectureState.data as Lecture;

  // 리팩토링3) lecture.chapters! 강제 단언 제거
  const chapters = lecture.chapters;
  if (!chapters || chapters.length === 0) {
    redirect('/mylearning');
  }
  const allLessons = chapters.flatMap((chapter: Chapter) => chapter.lessons);

  // 3) URL의 lessonId와 일치하는 레슨 찾기
  const currentLesson = allLessons.find(
    (l: Lesson) => Number(l.id) === Number(lessonId),
  );

  // 리팩토링3) lecture 내에 해당 lesson이 없으면 오류 처리 (리다이렉트)
  if (!currentLesson) {
    redirect('/mylearning');
  }

  // 4) 비디오 / 퀴즈 타입 분기
  const isVideoLesson = currentLesson!.lessonTypeDisplayName === 'VIDEO';
  const isCompleted = enrollmentInfo.completedLessonIds.some(
    (lessonId) => lessonId === parseInt(currentLesson.id),
  );

  // 5) 실제 UI 렌더링
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* 상단 타이틀 바 */}
      <TitleBar lectureTitle={lecture.title} />

      <div className="flex flex-1  mx-auto w-full">
        {/* 메인 영역 */}
        <main className="flex-1 flex items-center">
          {isVideoLesson ? (
            <Video enrollmentInfo={enrollmentInfo} lesson={currentLesson!} />
          ) : (
            <Quiz
              enrollmentId={parseInt(enrollmentId)}
              lesson={currentLesson!}
              isCompleted={isCompleted}
            />
          )}
        </main>

        {/* 오른쪽 사이드 커리큘럼 */}
        <AsideCurriculum
          lecture={lecture}
          currentLessonId={currentLesson!.id}
          enrollmentInfo={enrollmentInfo}
        />
      </div>
    </div>
  );
}
