// src/app/(main)/detail/[id]/page.tsx

import { notFound } from 'next/navigation';
import {
  getLectureByIdAction,
  getReviewsByLectureIdAction,
} from '@/features/lectures/actions';

import LectureSummry from '@/features/lectures/components/detail/LectureSummry';
import Curriculum from '@/features/lectures/components/detail/Curriculum';
import Reviews from '@/features/lectures/components/detail/Reviews';
import ButtonApply from '@/features/lectures/components/detail/ButtonApply';
import AverageReview from '@/features/lectures/components/detail/AverageReview';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function LectureDetailPage({ params }: PageProps) {
  const { id } = await params;

  // ✅ id가 숫자 경로라면 number로 변환해서 액션에 넘김
  const lectureId = Number(id);
  if (Number.isNaN(lectureId)) notFound();

  // ✅ 액션은 async라 await 필요
  const lectureRes = await getLectureByIdAction(lectureId);
  if (!lectureRes.success || !lectureRes.data) notFound();

  const lecture = lectureRes.data;

  // ✅ 리뷰도 async라 await
  const reviewsRes = await getReviewsByLectureIdAction(lectureId);
  const reviews = reviewsRes.success && reviewsRes.data ? reviewsRes.data : [];

  // console.log('[detail] fetching lectureId:', lectureId);

  return (
    <div className="min-h-screen bg-background pb-20">
      <LectureSummry
        lecture={lecture}
        // actionButton={<ButtonApply lectureId={lecture.id} />}
        actionButton={<ButtonApply lectureId={lectureId} />}
      />

      <div className="container px-4 md:px-8 py-12 flex flex-col md:flex-row gap-12">
        <div className="flex-1">
          <div className="mt-12">
            <Tabs defaultValue="curriculum" className="">
              <TabsList className="bg-transparent mb-10">
                <TabsTrigger
                  value="curriculum"
                  className="px-6 py-3 h-12 border-0 text-base dark:data-[state=active]:text-indigo-500 dark:data-[state=active]:bg-transparent dark:text-muted-foreground rounded-none cursor-pointer hover:bg-zinc-900 dark:data-[state=active]:hover:bg-zinc-900 relative after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-full after:bg-transparent data-[state=active]:after:bg-indigo-500"
                >
                  커리큘럼
                </TabsTrigger>
                <TabsTrigger
                  value="reviews"
                  className="px-6 py-3 h-12 border-0 dark:data-[state=active]:text-indigo-500 dark:data-[state=active]:bg-transparent dark:text-muted-foreground rounded-none cursor-pointer hover:bg-zinc-900 dark:data-[state=active]:hover:bg-zinc-900 relative after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-full after:bg-transparent data-[state=active]:after:bg-indigo-500"
                >
                  리뷰
                </TabsTrigger>
              </TabsList>

              <TabsContent value="curriculum" className="space-y-6">
                <Curriculum curriculum={lecture.chapters ?? []} />
              </TabsContent>

              <TabsContent value="reviews" className="space-y-6">
                <AverageReview reviews={reviews} />
                <Reviews reviews={reviews} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
