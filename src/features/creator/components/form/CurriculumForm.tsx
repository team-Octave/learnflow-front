'use client';

import { Chapter, CreatorLecture } from '../../types';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import ChapterItem from './ChapterItem';
import { Button } from '@/components/ui/button';
interface CurriculumFormProps {
  lecture: CreatorLecture;
}

const DEFAULT_CHAPTER: Partial<Chapter> = {
  chapterTitle: '',
  chapterOrder: 1,
  lessons: [],
};
const DEFAULT_CURRICULUM: Partial<Chapter>[] = [DEFAULT_CHAPTER];

export default function CurriculumForm({ lecture }: CurriculumFormProps) {
  // TODO: 요기서 상태 관리 react-hook-form?
  const curriculum =
    lecture.curriculum.length === 0 ? DEFAULT_CURRICULUM : lecture.curriculum;
  return (
    <form>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold">커리큘럼 구성</CardTitle>
          <CardDescription>
            챕터와 레슨을 추가하여 커리큘럼을 완성하세요
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {curriculum.map((chapter, idx) => (
            <ChapterItem
              key={chapter.chapterId}
              chapter={chapter}
              order={idx + 1}
            />
          ))}
        </CardContent>
        <CardFooter>
          <Button
            type="button"
            variant={'outline'}
            className="w-full cursor-pointer"
            onClick={() => {
              // TODO: 챕터 추가 로직 작성
            }}
          >
            챕터 추가
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
