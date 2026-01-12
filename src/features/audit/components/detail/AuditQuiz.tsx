// 문제 하나
// src/features/audit/components/detail/AuditQuiz.tsx

'use client';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/shared/utils';
import type { AuditQuizQuestion } from '@/features/audit/types';

function normalizeAnswer(answer: AuditQuizQuestion['answer']): 'O' | 'X' {
  if (answer === true) return 'O';
  if (answer === false) return 'X';
  return answer;
}

export default function AuditQuiz({
  question,
  index,
}: {
  question: AuditQuizQuestion;
  index: number;
}) {
  const ans = normalizeAnswer(question.answer);

  return (
    <div className="flex items-start gap-5 p-6 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm transition-all hover:border-primary/20 hover:shadow-md">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold mt-1">
        Q{index + 1}
      </div>

      <div className="flex-1 space-y-4">
        <p className="font-medium text-lg text-zinc-900 dark:text-zinc-100 leading-snug">
          {question.question}
        </p>

        <div className="flex items-center gap-2">
          <Badge
            variant={ans === 'O' ? 'default' : 'secondary'}
            className={cn(
              'text-base px-6 py-1.5 h-auto',
              ans === 'O'
                ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                : 'bg-zinc-100 text-zinc-500 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400',
            )}
          >
            {ans === 'O' ? '정답: O' : '정답: X'}
          </Badge>
        </div>
      </div>
    </div>
  );
}
