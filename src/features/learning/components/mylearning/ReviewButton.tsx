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
import { cn } from '@/lib/utils';
import { MessageSquare, Star } from 'lucide-react';
import { useState } from 'react';
import StarRating from './StarRating';

interface ReviewButtonProps {
  lectureTitle?: string;
  review?: {
    star: number;
    text: string;
  };
}

export default function ReviewButton({
  lectureTitle,
  review,
}: ReviewButtonProps) {
  // 테스트용 더미데이터 (주석 위아래 변경하면 리뷰 남기기 버튼으로 변경)
  // const reviewDummy = undefined;
  const reviewDummy = {
    star: 4,
    text: '강의가 너무 좋아요',
  };

  const [rating, setRating] = useState<number>(reviewDummy.star || 5); // 별점 상태
  const [comment, setComment] = useState<string>(reviewDummy.text || ''); // 리뷰 텍스트 상태

  const handleSubmit = () => {
    console.log('리뷰 등록:', { rating, comment });
    // TODO: 리뷰 API 연동
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-40 cursor-pointer text-zinc-400 hover:text-zinc-300"
        >
          {reviewDummy ? (
            <div className="flex gap-1">
              {Array.from({ length: 5 }, (_, index) => (
                <Star
                  key={index}
                  className={cn(
                    index < reviewDummy.star && 'fill-amber-300 text-amber-300',
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
        <StarRating value={rating} onChange={setRating} />
        <Textarea
          placeholder="수강평을 입력해주세요."
          value={comment}
          onChange={handleCommentChange}
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" className="cursor-pointer">
              취소
            </Button>
          </DialogClose>
          <Button
            type="submit"
            className="cursor-pointer"
            onClick={handleSubmit}
          >
            저장
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
