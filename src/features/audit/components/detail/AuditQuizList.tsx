// 퀴즈 목록

// src/features/audit/components/detail/AuditQuizList.tsx
import type { AuditQuizQuestion } from '@/features/audit/types';
import AuditQuiz from './AuditQuiz';

export default function AuditQuizList({
  questions,
}: {
  questions?: AuditQuizQuestion[];
}) {
  if (!questions?.length) {
    return (
      <div className="p-6 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm text-zinc-500">
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
