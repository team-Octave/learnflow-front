'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/shared/utils';
import { MessageSquare, Star } from 'lucide-react';
import { useState, useTransition } from 'react';
import StarRating from './StarRating';
import { deleteReviewAction, writeReviewAction } from '../../actions';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface ReviewButtonProps {
  lectureId: number;
  lectureTitle: string;
  star: number | null;
  text: string | null;
  reviewId: number | null;
}

export default function ReviewButton({
  lectureId,
  lectureTitle,
  star,
  text,
  reviewId,
}: ReviewButtonProps) {
  const isDisabled = star !== null || text !== null;
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [rating, setRating] = useState<number>(star || 5); // 별점 상태
  const [content, setContent] = useState<string>(text || ''); // 리뷰 텍스트 상태
  const [isPending, startTransition] = useTransition();

  const handleSubmit = () => {
    if (!content) {
      return;
    }
    startTransition(async () => {
      const state = await writeReviewAction({ lectureId, rating, content });
      if (state.success) {
        setIsOpen(false);
        setContent('');
        setRating(5);
        router.refresh();
      } else {
        toast.error(state.message || '리뷰 저장에 실패하였습니다.');
      }
    });
  };

  const handleDeleteReview = () => {
    if (!reviewId) {
      toast.error('리뷰 정보가 유효하지 않습니다.');
      return;
    }
    startTransition(async () => {
      const state = await deleteReviewAction(reviewId);
      if (state.success) {
        setIsOpen(false);
        setContent('');
        setRating(5);
        router.refresh();
      } else {
        toast.error(state.message || '리뷰 삭제에 실패하였습니다.');
      }
    });
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleClose = () => {
    setRating(5);
    setContent('');
  };

  const handleOpen = () => {
    if (star) setRating(star);
    if (text) setContent(text);
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(next: boolean) => {
        if (!next) handleClose(); // 닫힐 때 실행
        if (next) handleOpen(); // 열릴 때 실행
        setIsOpen(next);
      }}
    >
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-40 cursor-pointer text-zinc-400 hover:text-zinc-300"
        >
          {star ? (
            <div className="flex gap-1">
              {Array.from({ length: 5 }, (_, index) => (
                <Star
                  key={index}
                  className={cn(
                    index < star! && 'fill-amber-300 text-amber-300',
                  )}
                />
              ))}
            </div>
          ) : (
            <>
              <MessageSquare />
              리뷰 남기기
            </>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-bold">리뷰 남기기</DialogTitle>
          <DialogDescription>
            <span className="text-white font-semibold">{lectureTitle} </span>
            <span>강의는 어떠셨나요? 강의에 대한 평가를 남겨주세요.</span>
          </DialogDescription>
        </DialogHeader>
        <StarRating
          isDisabled={isDisabled}
          value={rating}
          onChange={setRating}
        />
        <Textarea
          placeholder="수강평을 입력해주세요."
          value={content}
          onChange={handleContentChange}
          disabled={isDisabled}
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" className="cursor-pointer">
              취소
            </Button>
          </DialogClose>
          {isDisabled ? (
            <Button
              type="button"
              className="cursor-pointer bg-red-500 hover:bg-red-600"
              onClick={handleDeleteReview}
              disabled={isPending}
            >
              삭제
            </Button>
          ) : (
            <Button
              type="button"
              className="cursor-pointer"
              onClick={handleSubmit}
              disabled={isPending}
            >
              저장
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
