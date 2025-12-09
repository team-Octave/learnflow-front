// src/app/(main)/detail/[id]/page.tsx

import { notFound } from 'next/navigation';
import { loadLectureDetail, loadReviews } from '@/features/lectures/actions';
import LectureSummary from '@/features/lectures/components/detail/LectureSummry';
import LectureContent from '@/features/lectures/components/detail/LectureContent';
import Curriculum from '@/features/lectures/components/detail/Curriculum';
import Reviews from '@/features/lectures/components/detail/Reviews';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function LectureDetailPage({ params }: PageProps) {
  const { id } = await params;

  // 강의 데이터 불러오기
  const lecture = loadLectureDetail(id);

  if (!lecture) {
    notFound();
  }

  // 리뷰 데이터 불러오기
  const reviews = loadReviews(id);

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* 상단 요약 영역 */}
      <LectureSummary lecture={lecture} />

      {/* 메인 컨텐츠 영역 */}
      <div className="container px-4 md:px-8 py-12 flex flex-col md:flex-row gap-12">
        {/* 왼쪽: 커리큘럼 + 상세설명 + 리뷰 */}
        <div className="flex-1 space-y-12">
          {/* 강의 핵심 정보 / 설명 */}
          <LectureContent lecture={lecture} />

          {/* 커리큘럼 */}
          <Curriculum curriculum={lecture.curriculum} />

          {/* 리뷰 목록 */}
          <Reviews reviews={reviews} />
        </div>

        {/* 오른쪽: 수강 신청 버튼 섹션 */}
        <div className="w-full md:w-80 shrink-0">
          <div className="sticky top-24">
            {/* 이미 만든 컴포넌트가 있는 경우 ButtonApply.tsx 사용 */}
            {/* <ButtonApply lectureId={lecture.id} /> */}

            <button className="w-full h-12 rounded-lg bg-white text-zinc-950 font-bold hover:bg-zinc-200 transition">
              수강 신청하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
