// src/app/(main)/detail/[id]/page.tsx

import LectureSummary from '@/features/lectures/components/detail/LectureSummary';
import Curriculum from '@/features/lectures/components/detail/Curriculum';
import Reviews from '@/features/lectures/components/detail/Reviews';
import AverageReview from '@/features/lectures/components/detail/AverageReview';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  getLectureByIdAction,
  getReviewByIdAction,
} from '@/features/lectures/actions';
import { notFound, redirect } from 'next/navigation';
import { getParam } from '@/shared/utils';

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function LectureDetailPage({
  params,
  searchParams,
}: PageProps) {
  const { id } = await params;
  const pageParam = getParam((await searchParams).page) || '1';

  const page = pageParam ? parseInt(pageParam) : 1;
  const lectureId = parseInt(id);

  // 강의 데이터 불러오기
  const [lectureState, reviewState] = await Promise.all([
    getLectureByIdAction(lectureId),
    getReviewByIdAction(lectureId, page),
  ]);

  if (!lectureState.success || !reviewState.success) {
    console.log(lectureState.message || reviewState.message);
    return notFound();
  }

  const lecture = lectureState.data!;
  const reviewData = reviewState.data!;

  if (isNaN(page) || page <= 0 || page - 1 > reviewData.totalPages) {
    redirect(`/detail/${id}`);
  }

  return (
    <div className="flex flex-col items-center min-h-screen pb-20 w-full">
      {/* 상단 요약 영역 */}
      <LectureSummary lecture={lecture} />

      {/* 메인 컨텐츠 영역 */}
      <div className="px-4 md:px-8 py-12 flex flex-col md:flex-row gap-12 w-full">
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
              {/* TabsTrigger value="curriculum" 이 눌렸을 때 이 안의 내용에 curriculum만 화면에 보여주는 영역 */}
              <TabsContent value="curriculum" className="space-y-6">
                <Curriculum curriculum={lecture.chapters!} />
              </TabsContent>

              {/* 수강평 탭 */}
              <TabsContent value="reviews" className="space-y-6">
                <AverageReview
                  reviews={reviewData}
                  ratingAverage={lecture.ratingAverage}
                />
                <Reviews reviewData={reviewData} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
