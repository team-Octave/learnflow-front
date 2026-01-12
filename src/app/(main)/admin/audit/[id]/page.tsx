// src/app/(main)/admin/audit/[id]/page.tsx

import AuditBasicInfo from '@/features/audit/components/detail/AuditBasicInfo';
import AuditCurriculumInfo from '@/features/audit/components/detail/AuditCurriculumInfo';
import AuditAcceptButton from '@/features/audit/components/detail/AuditAcceptButton';
import AuditReturnButton from '@/features/audit/components/detail/AuditReturnButton';
import { getAuditDetailAction } from '@/features/audit/actions';

// Next.js 최신 버전(v15+) 인터페이스 규격
interface AuditDetailPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

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


export default async function AuditDetailPage(props: AuditDetailPageProps) {
  // 1. params와 searchParams 모두 await 처리 (Next.js 15 규격)
  const params = await props.params;
  const searchParams = await props.searchParams;
  const rawId = params.id;

  if (!rawId) {
    return <ErrorState message="잘못된 접근입니다. (ID가 없습니다)" />;
  }

  const id = decodeURIComponent(rawId);

  try {
    // 2. 데이터 페칭
    const state = await getAuditDetailAction(id);

    // 3. 응답 상태 확인
    if (!state || !state.success || !state.data) {
      return (
        <ErrorState
          message={state?.message ?? '강의 데이터를 찾을 수 없습니다.'}
        />
      );
    }

    const audit = state.data;

    return (
      <div className="space-y-8 w-full max-w-5xl mx-auto py-10">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            강의 검토 상세
          </h1>
        </div>

        <AuditBasicInfo audit={audit} />
        <AuditCurriculumInfo chapters={audit.chapters ?? []} />

        <div className="flex justify-end gap-3 pt-8 border-t border-zinc-200 dark:border-zinc-800">
          <AuditReturnButton auditId={audit.id} />
          <AuditAcceptButton auditId={audit.id} />
        </div>
      </div>
    );
  } catch (error) {
    // 4. 예상치 못한 런타임 에러 처리
    console.error('Audit Detail Page Error:', error);
    return <ErrorState message="서버 통신 중 오류가 발생했습니다." />;
  }
}
