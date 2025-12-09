// src/features/lectures/components/detail/LectureSummry.tsx

'use client';

import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';
import type { Lecture } from '../../types';

interface Props {
  lecture: Lecture;
}

export default function LectureSummary({ lecture }: Props) {
  return (
    <div className="relative bg-zinc-900 border-b border-zinc-800">
      {/* Background Image */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-zinc-950 via-zinc-950/90 to-zinc-950/50 z-10" />

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={lecture.thumbnail}
          alt={lecture.title}
          className="w-full h-full object-cover opacity-30 blur-sm"
        />
      </div>

      {/* Content */}
      <div className="container relative z-20 px-4 md:px-8 py-12 md:py-16 flex flex-col md:flex-row gap-8 items-end">
        <div className="flex-1 space-y-6">
          {/* Category + level + Rating */}
          <div className="flex items-center gap-2">
            <Badge
              variant="secondary"
              className="bg-indigo-500/10 text-indigo-400 border-indigo-500/20 hover:bg-indigo-500/20"
            >
              {lecture.category.toUpperCase()}
            </Badge>

            <Badge variant="outline" className="text-zinc-300 border-zinc-700">
              {lecture.level === 'BEGINNER' && '초급'}
              {lecture.level === 'INTERMEDIATE' && '중급'}
              {lecture.level === 'ADVANCED' && '고급'}
            </Badge>

            <div className="flex items-center gap-1 text-yellow-500 text-sm font-medium">
              <Star className="w-4 h-4 fill-current" />
              <span>{lecture.rating}</span>
              <span className="text-muted-foreground ml-1">
                ({lecture.enrollmentCount.toLocaleString()}명 수강)
              </span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
            {lecture.title}
          </h1>

          {/* Description */}
          <p className="text-lg text-zinc-300 max-w-2xl leading-relaxed">
            {lecture.description}
          </p>

          {/* creator */}
          <div className="flex items-center gap-4 pt-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-zinc-700 flex items-center justify-center text-zinc-300 font-bold">
                {lecture.creatorName[0]}
              </div>
              <div>
                <p className="text-sm font-medium text-white">
                  {lecture.creatorName}
                </p>
                <p className="text-xs text-zinc-400">대표 강사</p>
              </div>
            </div>
          </div>
        </div>

        {/* NOTE: Right-side action button은 page.tsx에서 처리 */}
      </div>
    </div>
  );
}
