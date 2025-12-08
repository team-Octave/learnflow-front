'use client';

import { cn } from '@/lib/utils';
import { Star } from 'lucide-react';
import { useState } from 'react';

interface StarRatingProps {
  value: number;
  onChange: (value: number) => void;
}

const RATING_DESCRIPTIONS: Record<number, string> = {
  1: '아쉬워요',
  2: '그저 그래요',
  3: '보통이에요',
  4: '좋아요!',
  5: '최고에요!',
};

export default function StarRating({ value, onChange }: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState<number>(0);
  const displayRating = hoverRating || value;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex gap-1">
        {Array.from({ length: 5 }, (_, index) => {
          const starScore = index + 1;
          const isActive = starScore <= displayRating;

          return (
            <button
              key={index}
              type="button"
              onClick={() => onChange(starScore)}
              onMouseEnter={() => setHoverRating(starScore)}
              onMouseLeave={() => setHoverRating(0)}
              className="p-1 transition-transform hover:scale-105 focus:outline-none"
            >
              <Star
                className={cn(
                  'w-8 h-8  duration-200 text-zinc-500',
                  isActive && 'fill-yellow-300 text-yellow-300',
                )}
              />
            </button>
          );
        })}
      </div>

      <div className="h-6 text-sm font-medium text-zinc-600">
        {displayRating > 0 ? (
          <span className="animate-in fade-in zoom-in duration-200">
            <span className="font-bold text-yellow-500 mr-2">
              {displayRating}점
            </span>
            {RATING_DESCRIPTIONS[displayRating]}
          </span>
        ) : (
          <span className="text-zinc-400">별점을 선택해주세요</span>
        )}
      </div>
    </div>
  );
}
