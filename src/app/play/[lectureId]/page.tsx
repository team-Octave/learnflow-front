// src/app/play/[lectureId]/page.tsx
import { notFound, redirect } from 'next/navigation';
import { getLectureById } from '@/services/lectures.service';

// Promise 꼭 들어가야함
interface PlayLecturePageProps {
  params: Promise<{ lectureId: string; lessonId: string }>;
}

// /play/[lectureId]
// 예: /play/lecture-1
export default async function Page({ params }: PlayLecturePageProps) {
  const { lectureId } = await params;

  // 강의 조회 (동기)
  const lecture = await getLectureById(lectureId);

  if (!lecture) {
    // 존재하지 않는 강의면 404
    notFound();
  }

  // 전체 레슨 flat 으로 펼치기
  const allLessons =
    lecture.curriculum?.flatMap((chapter) => chapter.lessons) ?? [];

  if (allLessons.length === 0) {
    // 레슨이 하나도 없으면 404
    notFound();
  }

  // 나중에는 백엔드가 내려주는 lastCompletedLessonId 사용
  const lastCompletedLessonId =
    // (mock-data에는 아직 없으니, 없으면 첫 레슨으로)
    (lecture as any).lastCompletedLessonId ?? allLessons[0].id;

  // 해당 레슨으로 리다이렉트
  redirect(`/play/${lectureId}/${lastCompletedLessonId}`);
}
