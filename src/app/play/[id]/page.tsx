// src/app/play/[id]/page.tsx

import { notFound } from 'next/navigation';
import { getLectureById } from '@/services/lectures.service';
import { Video } from '@/features/learning/components/play/Video';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function PlayPage({ params }: PageProps) {
  const { id } = await params;

  // 서비스에서 lecture 불러오기
  const lecture = getLectureById(id);

  if (!lecture) {
    notFound();
  }

  return <Video lecture={lecture} />;
}
