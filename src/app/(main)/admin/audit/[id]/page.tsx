// src/app/(main)/admin/audit/[id]/page.tsx
import AuditBasicInfo from '@/features/audit/components/detail/AuditBasicInfo';
import AuditCurriculumInfo from '@/features/audit/components/detail/AuditCurriculumInfo';
import AuditAcceptButton from '@/features/audit/components/detail/AuditAcceptButton';
import AuditReturnButton from '@/features/audit/components/detail/AuditReturnButton';
import { getAuditDetailAction } from '@/features/audit/actions';

interface AuditDetailPageProps {
  params: Promise<{ id: string }>;
}

function ErrorState({ message }: { message?: string }) {
  return (
    <div className="w-full max-w-5xl mx-auto space-y-4">
      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        {message ?? '강의 정보를 불러오지 못했습니다.'}
      </p>
    </div>
  );
}

export default async function AuditDetailPage({
  params,
}: AuditDetailPageProps) {
  const { id } = await params;

  if (!id) return <ErrorState message="잘못된 접근입니다. (id가 없습니다)" />;

  // string -> number 변환
  const lectureId = parseInt(id, 10);
  if (Number.isNaN(lectureId)) {
    return <ErrorState message="잘못된 접근입니다. (id가 숫자가 아닙니다)" />;
  }

  // getAuditDetailAction은 number 받도록 변경됨
  const state = await getAuditDetailAction(lectureId);

  if (!state.success || !state.data) {
    return (
      <ErrorState
        message={state.message ?? '강의 정보를 불러오지 못했습니다.'}
      />
    );
  }

  const audit = state.data;

  return (
    <div className="flex-1">
      {/* 1) 강의 기본 정보 */}
      <AuditBasicInfo audit={audit} />

      {/* 2) 커리큘럼 + 레슨 컨텐츠(영상/퀴즈) */}
      <AuditCurriculumInfo
        lectureId={audit.lectureId}
        chapters={audit.chapters}
      />

      {/* 3) 승인 / 반려 */}
      <div className="flex justify-end gap-3 pt-8 border-t border-zinc-200 dark:border-zinc-800">
        <AuditReturnButton lectureId={audit.lectureId} />
        <AuditAcceptButton lectureId={audit.lectureId} />
      </div>
    </div>
  );
}
