// src/features/audit/components/detail/AuditQuiz.tsx
'use client';

import { Badge } from '@/components/ui/badge';
import { AdminQuizQuestion } from '../../types';

interface AuditQuizProps {
  question: AdminQuizQuestion;
  index: number;
}

export default function AuditQuiz({ question, index }: AuditQuizProps) {
  const ans: 'O' | 'X' = question.correct ? 'O' : 'X';

  return (
    <div className="flex items-start gap-5 p-6 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm transition-all hover:shadow-md">
      {/* Q 번호 */}
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500 dark:text-emerald-400 font-bold mt-1">
        Q{index + 1}
      </div>

      <div className="flex-1 space-y-4">
        {/* 질문 */}
        <p className="font-medium text-lg text-zinc-900 dark:text-zinc-100 leading-snug">
          {question.question}
        </p>

        {/* 정답 뱃지 (variant 처리) */}
        <Badge variant={ans} className="text-base px-6 py-1.5 h-auto">
          정답: {ans}
        </Badge>
      </div>
    </div>
  );
}
