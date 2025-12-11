// src/app/play/[id]/page.tsx
import { notFound } from 'next/navigation';
import {
  getLectureById,
  getLearningProgress,
} from '@/services/lectures.service';
import { PlayPageClient } from '@/features/learning/components/play/PlayPageClient';

// interface PlayPageProps {
//   params: { id: string }; // ✅ Promise 제거
// }

interface PlayPageProps {
  params: Promise<{ id: string }>;
}

// 강의 수강 페이지 (서버 컴포넌트)
export default async function PlayPage({ params }: PlayPageProps) {
  const { id } = await params;

  // 1) 강의 데이터 가져오기
  const lecture = getLectureById(id); // lectures.service는 지금 sync 함수라 await 필요 X
  if (!lecture) {
    notFound();
  }

  // 2) 학습 진행 데이터 (더미)
  const progress = await getLearningProgress(id);

  // 3) 실제 UI는 클라이언트 컴포넌트에서
  return <PlayPageClient lecture={lecture} progress={progress} />;
}
