'use client';

import { TableCell, TableRow } from '@/components/ui/table';
import { ChevronDownIcon, Star } from 'lucide-react';
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { useConfirm } from '@/hooks/useConfirm';
import Image from 'next/image';

interface LectureRowProps {
  lecture: CreatorLecture;
}

export default function LectureRow({ lecture }: LectureRowProps) {
  const confirm = useConfirm();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handlePublish = async () => {
    const ok = await confirm(
      `${lecture.title} 강의 검토를 신청하시겠습니까?`,
      '검토가 시작되면 강의 내용을 수정하실 수 없으며 공개된 후에는 강의를 삭제할 수 없습니다.',
    );
    if (!ok) {
      return;
    }
    startTransition(async () => {
      const state = await publishCreatorLectureAction(lecture.id);
      if (state.success) {
        toast.success(`강의 검토 신청이 완료되었습니다.`);
        router.refresh();
      } else {
        toast.error(state.message || '강의 공개에 실패하였습니다.');
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
        return <Badge variant={'submitted'}>검토 중</Badge>;
      }
      case 'PUBLISHED': {
        return <Badge variant={'published'}>공개</Badge>;
      }
      case 'REJECTED': {
        return (
          <div className="flex gap-1">
            <Button
              variant={'none'}
              onClick={handlePublish}
              disabled={isPending}
              className="group w-16 h-6 rounded-xl border border-red-500/30 bg-red-500/15 text-red-500 hover:border-gray-400 hover:text-white hover:bg-white/10  text-xs cursor-pointer transition-all"
            >
              <span className="block group-hover:hidden">반려 됨</span>
              <span className="hidden group-hover:block font-bold">
                검토 요청
              </span>
            </Button>
            <Popover>
              <PopoverTrigger>
                <div className="flex items-center justify-center rounded-full h-6 w-6 border border-red-500/30 bg-red-500/15">
                  <ChevronDownIcon
                    strokeWidth={1}
                    size={20}
                    className="text-red-500 cursor-pointer"
                  />
                </div>
              </PopoverTrigger>
              <PopoverContent side="bottom" className="flex flex-col gap-3">
                <h2 className="font-semibold text-md ">강의 반려 사유</h2>
                <div className="flex flex-col pl-1 gap-1">
                  {lecture.rejectCategories?.map((c, idx) => (
                    <p className="text-sm" key={idx}>
                      ✓ {c}
                    </p>
                  ))}
                </div>
                <Separator />
                <h4 className="font-semibold text-md">상세 사유</h4>
                <Textarea
                  className="text-sm resize-none"
                  value={lecture.rejectReason}
                  disabled
                />
              </PopoverContent>
            </Popover>
          </div>
        );
      }
    }
  };

  return (
    <TableRow>
      <TableCell>
        <AspectRatio
          ratio={16 / 9}
          className="bg-muted rounded-lg overflow-hidden"
        >
          <Image
            src={lecture.thumbnailUrl || '/images/placeholder.jpg'} // fallback
            alt="강의 썸네일"
            fill
            sizes="128px"
            className="object-cover"
          />
        </AspectRatio>
      </TableCell>
      <TableCell>{lecture.title}</TableCell>
      <TableCell>
        <Badge variant="default">{CATEGORY_MAP[lecture.categoryId]}</Badge>
      </TableCell>
      <TableCell>
        {lecture.paymentType === 'PAID' ? (
          <Badge variant={'membership'}>멤버십</Badge>
        ) : (
          <Badge variant={'free'}>무료</Badge>
        )}
      </TableCell>
      <TableCell>{lectureStatus(lecture.statusDisplayName)}</TableCell>
      <TableCell>
        {lecture.enrollmentCount ? lecture.enrollmentCount.toLocaleString() : 0}
        명
      </TableCell>
      <TableCell>
        <div className="text-amber-300 flex h-full items-center gap-1">
          <Star className="fill-amber-300 text-amber-300" size={16} />
          {lecture.ratingAverage ? lecture.ratingAverage.toFixed(1) : '0.0'}
        </div>
      </TableCell>
      <TableCell>
        <LectureDropdown lectureId={lecture.id} lectureTitle={lecture.title} />
      </TableCell>
    </TableRow>
  );
}
