// src/app/(main)/admin/audit/[id]/page.tsx
import AuditBasicInfo from '@/features/audit/components/detail/AuditBasicInfo';
import AuditCurriculumInfo from '@/features/audit/components/detail/AuditCurriculumInfo';
import AuditAcceptButton from '@/features/audit/components/detail/AuditAcceptButton';
import AuditReturnButton from '@/features/audit/components/detail/AuditReturnButton';
import { getAuditDetailAction } from '@/features/audit/actions';

type PageProps = {
  params: Record<string, string | string[] | undefined>;
};

function ErrorState({ message }: { message?: string }) {
  return (
    <div className="w-full max-w-5xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
        강의 검토 상세
      </h1>
      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        {message ?? '강의 정보를 불러오지 못했습니다.'}
      </p>
    </div>
  );
}

function pickFirstParam(params: Record<string, string | string[] | undefined>) {
  // 1) 일반적으로는 params.id
  const direct = params?.id;
  if (typeof direct === 'string') return direct;
  if (Array.isArray(direct)) return direct[0];

  // 2) 혹시 폴더명이 [auditId] 같은 경우 대비: 첫 번째 값 꺼내기
  const first = Object.values(params ?? {}).find(Boolean);
  if (typeof first === 'string') return first;
  if (Array.isArray(first)) return first[0];

  return undefined;
}

export default async function AuditDetailPage({ params }: PageProps) {
  const rawId = pickFirstParam(params);

  if (!rawId) {
    return <ErrorState message="잘못된 접근입니다. (id가 없습니다)" />;
  }

  // 안전하게 디코딩(한글/특수문자 들어올 때 대비)
  const id = decodeURIComponent(rawId);

  const state = await getAuditDetailAction(id);

  if (!state.success || !state.data) {
    return (
      <ErrorState
        message={state.message ?? '강의 정보를 불러오지 못했습니다.'}
      />
    );
  }

  const audit = state.data;

  return (
    <div className="space-y-8 w-full max-w-5xl mx-auto">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          강의 검토 상세
        </h1>
      </div>

      {/* 1) 강의 기본 정보 */}
      <AuditBasicInfo audit={audit} />

      {/* 2) 커리큘럼 + 레슨 컨텐츠(영상/퀴즈) + 이전/다음 */}
      <AuditCurriculumInfo chapters={audit.chapters} />

      {/* 3) 승인/반려 */}
      <div className="flex justify-end gap-3 pt-8 border-t border-zinc-200 dark:border-zinc-800">
        <AuditReturnButton auditId={audit.id} />
        <AuditAcceptButton auditId={audit.id} />
      </div>
    </div>
  );
}
