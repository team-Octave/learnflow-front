// src/app/(main)/detail/[id]/page.tsx

import LectureSummary from '@/features/lectures/components/detail/LectureSummry';
import Curriculum from '@/features/lectures/components/detail/Curriculum';
import Reviews from '@/features/lectures/components/detail/Reviews';
import ButtonApply from '@/features/lectures/components/detail/ButtonApply';
import AverageReview from '@/features/lectures/components/detail/AverageReview';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  getLectureByIdAction,
  getReviewByIdAction,
} from '@/features/lectures/actions';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function LectureDetailPage({ params }: PageProps) {
  const { id } = await params;

  // 강의 데이터 불러오기
  const [lectureRes, reviewRes] = await Promise.all([
    getLectureByIdAction(parseInt(id)),
    getReviewByIdAction(parseInt(id)),
  ]);
  if (!lectureRes.success || !reviewRes.success) {
    return <div>{lectureRes.error || reviewRes.error}</div>;
  }

  const lecture = lectureRes.data!;
  const reviews = reviewRes.data!;

  return (
    <div className="min-h-screen bg-background pb-20 w-[60%]">
      {/* 상단 요약 영역 */}
      <LectureSummary
        lecture={lecture}
        actionButton={
          <ButtonApply lectureId={lecture.id} lectureTitle={lecture.title} />
        }
      />

      {/* 메인 컨텐츠 영역 */}
      <div className="container px-4 md:px-8 py-12 flex flex-col md:flex-row gap-12">
        {/* 왼쪽: 상세 + 탭(커리큘럼 / 리뷰) */}
        <div className="flex-1">
          {/* 탭 영역 */}
          <div className="mt-12">
            <Tabs defaultValue="curriculum" className="">
              <TabsList className="bg-transparent mb-10">
                <TabsTrigger
                  value="curriculum"
                  className="px-6 py-3 h-12 border-0 text-base dark:data-[state=active]:text-indigo-500  dark:data-[state=active]:bg-transparent dark:text-muted-foreground rounded-none cursor-pointer hover:bg-zinc-900 dark:data-[state=active]:hover:bg-zinc-900 
                  relative
                  after:absolute
                  after:left-0
                  after:bottom-0
                  after:h-0.5
                  after:w-full
                  after:bg-transparent
                data-[state=active]:after:bg-indigo-500"
                >
                  커리큘럼
                </TabsTrigger>
                <TabsTrigger
                  value="reviews"
                  className="px-6 py-3 h-12 border-0 dark:data-[state=active]:text-indigo-500  dark:data-[state=active]:bg-transparent dark:text-muted-foreground rounded-none cursor-pointer hover:bg-zinc-900 dark:data-[state=active]:hover:bg-zinc-900 
                  relative
                  after:absolute
                  after:left-0
                  after:bottom-0
                  after:h-0.5
                  after:w-full
                  after:bg-transparent
                data-[state=active]:after:bg-indigo-500"
                >
                  리뷰
                </TabsTrigger>
              </TabsList>

              {/* 커리큘럼 탭 */}
              <TabsContent value="curriculum" className="space-y-6">
                <Curriculum curriculum={lecture.chapters!} />
              </TabsContent>

              {/* 수강평 탭 */}
              <TabsContent value="reviews" className="space-y-6">
                <AverageReview
                  reviews={reviews}
                  ratingAverage={lecture.ratingAverage}
                />
                <Reviews reviews={reviews} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
