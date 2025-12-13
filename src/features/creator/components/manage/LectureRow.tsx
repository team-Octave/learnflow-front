'use client';

import { TableCell, TableRow } from '@/components/ui/table';
import { Loader2, Lock, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { CreatorLecture } from '../../types';
import LectureDropdown from './LectureDropdown';
import { CATEGORY_MAP } from '@/features/lectures/types';
import { Button } from '@/components/ui/button';
import { useTransition } from 'react';
import { publishCreatorLectureAction } from '../../actions';
import { useRouter } from 'next/navigation';

interface LectureRowProps {
  lecture: CreatorLecture;
}

export default function LectureRow({ lecture }: LectureRowProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handlePublish = () => {
    if (
      !confirm(
        `${lecture.title} 강의를 공개하시겠습니까? 공개 후에는 삭제할 수 없습니다.`,
      )
    ) {
      return;
    }
    startTransition(async () => {
      const response = await publishCreatorLectureAction(lecture.id);
      if (!response.success) {
        alert(response.error);
        return;
      } else {
        alert(`${lecture.title} 강의가 공개되었습니다.`);
        router.refresh();
      }
    });
  };

  return (
    <TableRow>
      <TableCell>
        <AspectRatio ratio={16 / 9} className="bg-muted rounded-lg">
          <img
            src={lecture.thumbnailUrl}
            alt="강의 썸네일"
            className="h-full w-full rounded-lg object-cover "
          />
        </AspectRatio>
      </TableCell>
      <TableCell>{lecture.title}</TableCell>
      <TableCell>
        <Badge variant="secondary">{CATEGORY_MAP[lecture.categoryId]}</Badge>
      </TableCell>
      <TableCell>
        {lecture.statusDisplayName === 'PUBLISHED' ? (
          <Badge
            variant="secondary"
            className="border border-green-500 bg-green-950 text-green-500"
          >
            공개 됨
          </Badge>
        ) : (
          <Button
            variant="outline"
            onClick={handlePublish}
            disabled={isPending}
            className="group w-16 h-6 rounded-xl border-gray-400 text-gray-500 hover:bg-green-50 text-xs cursor-pointer transition-all"
          >
            <span className="block group-hover:hidden">작성 중</span>
            <span className="hidden group-hover:block font-bold">공개하기</span>
          </Button>
        )}
      </TableCell>
      <TableCell>
        {lecture.enrollmentCount ? lecture.enrollmentCount.toLocaleString() : 0}
        명
      </TableCell>
      <TableCell>
        <div className="text-amber-300 flex h-full items-center gap-1">
          <Star className="fill-amber-300 text-amber-300" />
          {lecture.ratingAverage ? lecture.ratingAverage.toFixed(1) : '0.0'}
        </div>
      </TableCell>
      <TableCell>
        <LectureDropdown lectureId={lecture.id} lectureTitle={lecture.title} />
      </TableCell>
    </TableRow>
  );
}
