'use client';

import { TableCell, TableRow } from '@/components/ui/table';
import { CircleAlertIcon, CircleQuestionMarkIcon, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { CreatorLecture, LectureStatus } from '../../types';
import LectureDropdown from './LectureDropdown';
import { CATEGORY_MAP } from '@/features/lectures/types';
import { Button } from '@/components/ui/button';
import { useTransition } from 'react';
import { publishCreatorLectureAction } from '../../actions';
import { useRouter } from 'next/navigation';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface LectureRowProps {
  lecture: CreatorLecture;
}

export default function LectureRow({ lecture }: LectureRowProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handlePublish = () => {
    if (
      !confirm(
        `${lecture.title} 강의 검토를 신청하시겠습니까? 검토가 시작되면 강의 내용을 수정하실 수 없으며 공개된 후에는 강의를 삭제할 수 없습니다.`,
      )
    ) {
      return;
    }
    startTransition(async () => {
      const state = await publishCreatorLectureAction(lecture.id);
      if (state.success) {
        alert(`${lecture.title} 강의가 공개되었습니다.`);
        router.refresh();
      } else {
        alert(state.message || '강의 공개에 실패하였습니다.');
      }
    });
  };

  const lectureStatus = (status: LectureStatus) => {
    switch (status) {
      case 'UNPUBLISHED': {
        return (
          <Button
            variant="outline"
            onClick={handlePublish}
            disabled={isPending}
            className="group w-16 h-6 rounded-xl border-gray-400 text-gray-500 hover:bg-white/10 text-xs cursor-pointer transition-all"
          >
            <span className="block group-hover:hidden">비공개</span>
            <span className="hidden group-hover:block font-bold">
              검토 요청
            </span>
          </Button>
        );
      }
      case 'SUBMITTED': {
        return (
          <Badge
            variant="secondary"
            className="w-16 border border-yellow-500 bg-yellow-500/10 text-yellow-500"
          >
            검토 중
          </Badge>
        );
      }
      case 'PUBLISHED': {
        return (
          <Badge
            variant="secondary"
            className="w-16 border border-green-500 bg-green-500/10 text-green-500"
          >
            공개
          </Badge>
        );
      }
      case 'REJECTED': {
        return (
          <div className="flex gap-1">
            <Button
              variant={'none'}
              onClick={handlePublish}
              disabled={isPending}
              className="group w-16 h-6 rounded-xl border border-red-500 bg-red-500/10 text-red-500 hover:border-gray-400 hover:text-white hover:bg-white/10  text-xs cursor-pointer transition-all"
            >
              <span className="block group-hover:hidden">반려 됨</span>
              <span className="hidden group-hover:block font-bold">
                검토 요청
              </span>
            </Button>
            <Tooltip>
              <TooltipTrigger>
                <CircleQuestionMarkIcon
                  size={24}
                  className="text-red-500 cursor-pointer"
                />
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>반려 사유가 들어갈 자리</p>
              </TooltipContent>
            </Tooltip>
          </div>
        );
      }
    }
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
      <TableCell>{lectureStatus(lecture.statusDisplayName)}</TableCell>
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
