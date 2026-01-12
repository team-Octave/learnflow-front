// 강의 검토 상세 페이지에서 영상 컨텐츠 영역

// src/features/audit/components/detail/AuditVideo.tsx
'use client';

import { PlayCircle } from 'lucide-react';

export default function AuditVideo({ videoUrl }: { videoUrl?: string }) {
  // 실제 영상 URL 있으면 보여주고, 없으면 placeholder
  if (videoUrl) {
    return (
      <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800 bg-black">
        <video controls className="w-full h-auto">
          <source src={videoUrl} />
        </video>
      </div>
    );
  }

  return (
    <div className="bg-zinc-100/50 dark:bg-zinc-900/50 rounded-lg border-2 border-dashed border-zinc-200 dark:border-zinc-800 overflow-hidden relative">
      <div className="aspect-video relative flex items-center justify-center group hover:border-primary/30 transition-colors">
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center mx-auto text-zinc-400 dark:text-zinc-500 group-hover:scale-110 transition-transform duration-300">
            <PlayCircle className="w-8 h-8" />
          </div>
          <div>
            <p className="text-zinc-500 dark:text-zinc-400 font-medium text-lg">
              영상 컨텐츠 영역
            </p>
            <p className="text-sm text-zinc-400">Video Player Interface</p>
          </div>
        </div>
      </div>
    </div>
  );
}
