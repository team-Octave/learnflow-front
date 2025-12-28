import { getCreatorLecturesAction } from '@/features/creator/actions';
import LectureAddButton from '@/features/creator/components/manage/LectureAddButton';
import LectureTable from '@/features/creator/components/manage/LectureTable';
import { CreatorLecture } from '@/features/creator/types';
import { notFound } from 'next/navigation';

export default async function CreatorPage() {
  const state = await getCreatorLecturesAction();

  if (!state.success) {
    console.log(state.message);
    return notFound();
  }

  const lectures: CreatorLecture[] = state.data.content;
  const sortedLectures = lectures.sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt),
  );

  return (
    <div className="flex flex-col mx-auto my-12 gap-8 w-[80%]">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-1">
          <div className="text-2xl font-bold text-white">강의 관리</div>
          <div className="text-zinc-500">
            등록된 강의 현황을 확인하고 관리하세요.
          </div>
        </div>
        <LectureAddButton />
      </div>
      <LectureTable lectures={sortedLectures} />
    </div>
  );
}
