// src/app/play/[enrollmentId]?lectureId=LEC1&lessonId=LES1
import { Chapter, Lecture, Lesson } from '@/features/lectures/types';
import { Enrollment } from '@/features/learning/types';
import { getLectureByIdAction } from '@/features/lectures/actions';
import { TitleBar } from '@/features/learning/components/play/TitleBar';
import { Video } from '@/features/learning/components/play/Video';
import { Quiz } from '@/features/learning/components/play/Quiz';
import { AsideCurriculum } from '@/features/learning/components/play/AsideCurriculum';
import { getEnrollmentByIdAction } from '@/features/learning/actions';
import { notFound, redirect } from 'next/navigation';

// URL : /play/[enrollmentId]?lectureId=LEC1&lessonId=LES1
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

  if (!enrollmentId || !lectureId || !lessonId) {
    alert('수강 정보가 없습니다.');
    redirect('/mylearning');
  }

  const [enrollmentState, lectureState] = await Promise.all([
    getEnrollmentByIdAction(parseInt(enrollmentId)),
    getLectureByIdAction(parseInt(lectureId)),
  ]);

  if (!enrollmentState.success || !lectureState.success) {
    console.log(enrollmentState.message || lectureState.message);
    return notFound();
  }

  const enrollmentInfo = enrollmentState.data as Enrollment;
  const lecture = lectureState.data as Lecture;

  // 2) 전체 레슨을 flat 구조로 변환
  const allLessons = lecture.chapters!.flatMap(
    (chapter: Chapter) => chapter.lessons,
  );

  // 3) URL의 lessonId와 일치하는 레슨 찾기
  const currentLesson = allLessons.find(
    (l: Lesson) => Number(l.id) === Number(lessonId),
  );

  // 4) 비디오 / 퀴즈 타입 분기
  const isVideoLesson = currentLesson!.lessonTypeDisplayName === 'VIDEO';

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
