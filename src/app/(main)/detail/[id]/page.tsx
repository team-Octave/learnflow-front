// src/app/(main)/detail/[id]/page.tsx

import { notFound } from 'next/navigation';
import { loadLectureDetail, loadReviews } from '@/features/lectures/actions';
import LectureSummary from '@/features/lectures/components/detail/LectureSummry';
import LectureContent from '@/features/lectures/components/detail/LectureContent';
import Curriculum from '@/features/lectures/components/detail/Curriculum';
import Reviews from '@/features/lectures/components/detail/Reviews';
import ButtonApply from '@/features/lectures/components/detail/ButtonApply';
import AverageReview from '@/features/lectures/components/detail/AverageReview';

// shadcn tabs
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

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
      <LectureSummary
        lecture={lecture}
        actionButton={<ButtonApply lectureId={lecture.id} />}
      />

      {/* 메인 컨텐츠 영역 */}
      <div className="container px-4 md:px-8 py-12 flex flex-col md:flex-row gap-12">
        {/* 왼쪽: 상세 + 탭(커리큘럼 / 리뷰) */}
        <div className="flex-1">
          {/* 강의 핵심 정보 / 설명 */}
          <LectureContent lecture={lecture} />

          {/* 탭 영역 */}
          <div className="mt-12">
            <Tabs defaultValue="curriculum" className="">
              <TabsList className="w-auto justify-start bg-transparent border-b border-zinc-800 rounded-none h-auto p-0 mb-8">
                <TabsTrigger
                  value="curriculum"
                  className="rounded-none border-b-2 border-transparent px-6 py-3 text-base font-medium data-[state=active]:border-indigo-500 data-[state=active]:bg-transparent data-[state=active]:text-indigo-400"
                >
                  커리큘럼
                </TabsTrigger>
                <TabsTrigger
                  value="reviews"
                  className="rounded-none border-b-2 border-transparent px-6 py-3 text-base font-medium data-[state=active]:border-indigo-500 data-[state=active]:bg-transparent data-[state=active]:text-indigo-400"
                >
                  리뷰
                </TabsTrigger>
              </TabsList>

              {/* 커리큘럼 탭 */}
              <TabsContent value="curriculum" className="space-y-6">
                <Curriculum curriculum={lecture.curriculum} />
              </TabsContent>

              {/* 수강평 탭 */}
              {/* <TabsContent value="reviews" className="space-y-6">
                <Reviews reviews={reviews} />
              </TabsContent> */}

              {/* 수강평 탭 */}
              <TabsContent value="reviews" className="space-y-6">
                <AverageReview reviews={reviews} /> {/* <-- 추가된 부분 */}
                <Reviews reviews={reviews} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
