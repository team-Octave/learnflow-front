// src/features/learning/components/play/TitleBar.tsx
'use client';

import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  lecture: any;
}

export function TitleBar({ lecture }: Props) {
  return (
    <header className="h-16 border-b border-zinc-800 flex items-center justify-between px-4 shrink-0 bg-zinc-900/50 backdrop-blur-md">
      <div className="flex items-center gap-4">
        {/* 뒤로가기 버튼 */}
        <Button
          variant="ghost"
          size="icon"
          asChild
          className="text-zinc-400 hover:text-white hover:bg-zinc-800"
        >
          {/* 뒤로가기 버튼 클릭시 상세페이지로 이동  */}
          <Link href={`/detail/${lecture.id}`}>
            <ChevronLeft className="w-5 h-5" />
          </Link>
        </Button>

        {/* 현재 강의 제목 */}
        <h1 className="font-medium text-sm md:text-base truncate max-w-[200px] md:max-w-md">
          {lecture.title}
        </h1>
      </div>
    </header>
  );
}
