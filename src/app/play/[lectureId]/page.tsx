import { getLectureById } from '@/services/lectures.service';
import { useRouter } from 'next/router';

interface PlayPageProps {
  params: Promise<{ lectureId: string }>;
}

export default async function Page({ params }: PlayPageProps) {
  const router = useRouter();
  const { lectureId } = await params;
  const lecture = await getLectureById(lectureId);
  // 강의 기본 정보 + 각 레슨의 완료 정보 + 진행률 + 마지막으로 완료한 레슨 ID
  // const lastCompletedLessonId = lecture.lastCompltet
  // 예시
  const lastCompletedLessonId = 'lesson-1';
  // 마지막으로 완료한 레슨 ID가 없으면 가장 첫번째 레슨으로 리다이렉트
  // 있으면 그 레슨으로 리다이렉트
  router.replace(`/play/${lectureId}/${lastCompletedLessonId}`);
}
