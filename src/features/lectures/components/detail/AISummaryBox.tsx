'use client';

import { Sparkles, PlayCircle } from 'lucide-react';
import type { AILessonSummary } from '../../types';

interface AISummaryBoxProps {
  selectedLessonId: number | null;
  aiLessonSummaries: AILessonSummary[];
}

export default function AISummaryBox({
  selectedLessonId,
  aiLessonSummaries,
}: AISummaryBoxProps) {
  const matched = selectedLessonId
    ? aiLessonSummaries.find((s) => s.lessonId === selectedLessonId)
    : null;

  return (
    <div className="sticky top-24 bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-4 text-yellow-400">
        <Sparkles className="w-5 h-5" />
        <h3 className="font-bold text-lg text-white">AI 영상 요약</h3>
      </div>

      {selectedLessonId && matched ? (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-lg">
            <h4 className="font-medium text-indigo-300 mb-2 flex items-center gap-2">
              <PlayCircle className="w-4 h-4" />
              {matched.title}
            </h4>

            <p className="text-sm text-zinc-300 leading-relaxed">
              {matched.summary}
            </p>

            <ul className="mt-3 list-disc pl-5 text-sm text-zinc-300 space-y-1">
              {matched.keyTakeaways.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center space-y-3">
          <div className="p-3 bg-zinc-800/50 rounded-full">
            <PlayCircle className="w-8 h-8 text-zinc-600" />
          </div>
          <div>
            <p className="text-zinc-400 font-medium">레슨을 선택해주세요</p>
            <p className="text-xs text-zinc-500 mt-1">
              레슨을 클릭하면 AI의 강의 요약을
              <br />
              확인할 수 있어요
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
