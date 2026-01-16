import { TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Processing from '@/features/learning/components/mylearning/Processing';
import Completed from '@/features/learning/components/mylearning/Completed';
import LearningSort from '@/features/learning/components/mylearning/LearningSort';
import LearningTabs from '@/features/learning/components/mylearning/LearningTabs';
import { notFound } from 'next/navigation';
import { getLearningLecturesAction } from '@/features/learning/actions';
import {
  LearningLecture,
  LearningSortOptions,
} from '@/features/learning/types';

interface MyLearningPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function MyLearningPage({
  searchParams,
}: MyLearningPageProps) {
  const params = await searchParams;
  const currentTab = typeof params.tab === 'string' ? params.tab : 'processing';
  const sortOption: LearningSortOptions =
    typeof params.sort === 'string'
      ? (params.sort as LearningSortOptions)
      : 'RECENT-LEARNED';

  const state = await getLearningLecturesAction();

  if (!state.success) {
    console.log(state.message);
    return notFound();
  }

  const learningLectures = state.data! as LearningLecture[];
  const completedLectures = learningLectures.filter(
    (lecture) => lecture.enrollmentStatus === 'COMPLETED',
  );
  const progressLectures = learningLectures.filter(
    (lecture) => lecture.enrollmentStatus === 'IN_PROGRESS',
  );

  if (sortOption === 'RECENT-LEARNED') {
    progressLectures.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
    completedLectures.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  } else {
    progressLectures.sort((a, b) => b.enrolledAt.localeCompare(a.enrolledAt));
    completedLectures.sort((a, b) => b.enrolledAt.localeCompare(a.enrolledAt));
  }

  return (
    <div className="flex flex-col mx-auto my-12 gap-8 w-full">
      <div className="text-2xl font-bold text-white">내 학습</div>
      <LearningTabs defaultTab={currentTab}>
        <div className="flex justify-between">
          <TabsList>
            <TabsTrigger value="processing">수강 중</TabsTrigger>
            <TabsTrigger value="completed">완료</TabsTrigger>
          </TabsList>
          <LearningSort />
        </div>
        <TabsContent value="processing">
          <Processing lectures={progressLectures} />
        </TabsContent>
        <TabsContent value="completed">
          <Completed lectures={completedLectures} />
        </TabsContent>
      </LearningTabs>
    </div>
  );
}
