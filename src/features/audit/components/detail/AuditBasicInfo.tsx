// 강의 검토 상세 페이지에서 상단의 강의 기본정보
// src/features/audit/components/detail/AuditBasicInfo.tsx

'use client';

import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import type { AuditDetail } from '@/features/audit/types';

export default function AuditBasicInfo({ audit }: { audit: AuditDetail }) {
  return (
    <Card className="overflow-hidden border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6">
      <div className="flex flex-col md:flex-row gap-6 md:items-center">
        <div className="w-full md:w-1/3 min-w-[300px]">
          <AspectRatio
            ratio={16 / 9}
            className="bg-zinc-100 dark:bg-zinc-800 border-b md:border-b-0 md:border-r border-zinc-200 dark:border-zinc-800 overflow-hidden rounded-lg"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={audit.thumbnail}
              alt={audit.title}
              className="object-cover w-full h-full"
            />
          </AspectRatio>
        </div>

        <div className="flex flex-col justify-center flex-1 space-y-3">
          <div className="flex items-center gap-2 flex-wrap">
            {!!audit.category && (
              <Badge
                variant="outline"
                className="border-primary/50 text-primary"
              >
                {audit.category}
              </Badge>
            )}
            {!!audit.difficulty && (
              <Badge
                variant="secondary"
                className="bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
              >
                {audit.difficulty}
              </Badge>
            )}
          </div>

          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 leading-tight">
            {audit.title}
          </h2>

          <p className="text-zinc-600 dark:text-zinc-400 text-sm">
            {audit.description}
          </p>

          <div className="pt-2 text-sm text-zinc-500 flex items-center gap-2">
            <span>닉네임:</span>
            <span className="font-semibold text-zinc-900 dark:text-zinc-200">
              {audit.instructor ?? '-'}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
