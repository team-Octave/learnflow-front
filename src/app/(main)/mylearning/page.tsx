import { TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Processing from '@/features/learning/components/mylearning/Processing';
import Completed from '@/features/learning/components/mylearning/Completed';
import LearningSort from '@/features/learning/components/mylearning/LearningSort';
import LearningTabs from '@/features/learning/components/mylearning/LearningTabs';

interface MyLearningPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function MyLearningPage({
  searchParams,
}: MyLearningPageProps) {
  const params = await searchParams;
  const currentTab = typeof params.tab === 'string' ? params.tab : 'processing';
  const sortOrder =
    typeof params.sort === 'string' ? params.sort : 'recent-learned';
  return (
    <div className="flex flex-col mx-auto my-12 gap-8 w-[80%]">
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
          <Processing sortOrder={sortOrder} />
        </TabsContent>
        <TabsContent value="completed">
          <Completed />
        </TabsContent>
      </LearningTabs>
    </div>
  );
}
