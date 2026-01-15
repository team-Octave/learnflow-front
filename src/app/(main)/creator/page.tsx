import { getCreatorLecturesAction } from '@/features/creator/actions';
import LectureAddButton from '@/features/creator/components/manage/LectureAddButton';
import LectureTable from '@/features/creator/components/manage/LectureTable';
import { getParam } from '@/shared/utils';
import { notFound, redirect } from 'next/navigation';

interface CreatorPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function CreatorPage({ searchParams }: CreatorPageProps) {
  const pageParam = getParam((await searchParams).page);
  const page = pageParam ? parseInt(pageParam) : 1;
  const state = await getCreatorLecturesAction(page);

  if (!state.success) {
    console.log(state.message);
    return notFound();
  }
  const lecturesData = state.data;

  if (isNaN(page) || page <= 0 || page - 1 > lecturesData.totalPages) {
    redirect('/creator');
  }
  return (
    <div className="flex flex-col mx-auto my-12 gap-8 w-full">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-1">
          <div className="text-2xl font-bold text-white">강의 관리</div>
          <div className="text-zinc-500">
            등록된 강의 현황을 확인하고 관리하세요.
          </div>
        </div>
        <LectureAddButton />
      </div>
      <LectureTable lecturesData={lecturesData} />
    </div>
  );
}
