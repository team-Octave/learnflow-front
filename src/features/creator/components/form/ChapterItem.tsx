import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Chapter } from '../../types';
import LessonItem from './LessonItem';
import { PencilLine, PlayCircle } from 'lucide-react';

interface ChapterItemProps {
  chapter: Partial<Chapter>;
  order: number;
}

export default function ChapterItem({ chapter, order }: ChapterItemProps) {
  return (
    <div className="flex flex-col p-4 border border-zinc-700 rounded-lg gap-4">
      <div className="flex gap-4">
        <Input
          placeholder={`챕터${order} 제목`}
          defaultValue={chapter.chapterTitle}
          // TODO: 챕터 제목 수정 로직 작성
        />
        <Button
          variant={'ghost'}
          className="cursor-pointer text-red-400 hover:text-red-500"
          type="button"
          onClick={() => {
            // TODO: 챕터 삭제 로직 작성
          }}
        >
          삭제
        </Button>
      </div>
      <div className="flex flex-col gap-2">
        {chapter.lessons!.map((lesson, idx) => (
          <LessonItem key={idx} initialLesson={lesson} order={idx + 1} />
        ))}
      </div>
      <div className="flex w-full gap-2">
        <Button
          type="button"
          variant={'outline'}
          className="border-dashed cursor-pointer flex-1 text-zinc-300 hover:text-white"
          onClick={() => {
            // TODO: 영상 레슨 추가 로직 작성
          }}
        >
          <PlayCircle />
          영상 레슨 추가
        </Button>
        <Button
          type="button"
          variant={'outline'}
          className="border-dashed cursor-pointer flex-1 text-zinc-300 hover:text-white"
          onClick={() => {
            // TODO: 퀴즈 레슨 추가 로직 작성
          }}
        >
          <PencilLine />
          퀴즈 레슨 추가
        </Button>
      </div>
    </div>
  );
}
