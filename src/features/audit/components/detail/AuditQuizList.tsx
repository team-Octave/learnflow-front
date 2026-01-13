// src/features/audit/components/detail/AuditQuizList.tsx
'use client';

import type { QuizQuestion } from '@/features/lectures/types';
import AuditQuiz from './AuditQuiz';

interface AuditQuizListProps {
  questions?: QuizQuestion[];
}

export default function AuditQuizList({ questions }: AuditQuizListProps) {
  if (!questions?.length) {
    return (
      <div className="p-6 rounded-lg border border-emerald-500/20 bg-emerald-500/5 text-sm text-emerald-600 dark:text-emerald-400">
        등록된 퀴즈가 없습니다.
      </div>
    );
  }

  return (
    <div className="space-y-6 pt-4">
      {questions.map((q, idx) => (
        <AuditQuiz key={String(q.id)} question={q} index={idx} />
      ))}
    </div>
  );
}
