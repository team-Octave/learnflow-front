// src/features/audit/components/detail/AuditQuiz.tsx
'use client';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/shared/utils';
import type { QuizQuestion } from '@/features/lectures/types';

interface AuditQuizProps {
  question: QuizQuestion;
  index: number;
}

export default function AuditQuiz({ question, index }: AuditQuizProps) {
  const ans: 'O' | 'X' = question.correct ? 'O' : 'X';

  return (
    <div className="flex items-start gap-5 p-6 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm transition-all hover:border-emerald-500/30 hover:shadow-md">
      {/* Q 번호 */}
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500 dark:text-emerald-400 font-bold mt-1">
        Q{index + 1}
      </div>

      <div className="flex-1 space-y-4">
        {/* 질문 */}
        <p className="font-medium text-lg text-zinc-900 dark:text-zinc-100 leading-snug">
          {question.question}
        </p>

        {/* 정답 뱃지 */}
        <Badge
          className={cn(
            'text-base px-6 py-1.5 h-auto border',
            ans === 'O'
              ? 'bg-emerald-500/15 text-emerald-600 border-emerald-500/30 dark:text-emerald-400'
              : 'bg-zinc-100 text-zinc-500 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-700',
          )}
        >
          정답: {ans}
        </Badge>
      </div>
    </div>
  );
}
