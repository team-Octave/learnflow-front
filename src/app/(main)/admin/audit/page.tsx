import AuditTable from '@/features/audit/components/main/AuditTable';
import { getApprovalsAction } from '@/features/audit/actions';
import { getParam } from '@/shared/utils';
import { notFound, redirect } from 'next/navigation';

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function AdminAuditPage({ searchParams }: Props) {
  const sp = await searchParams;

  const pageParam = getParam(sp.page);
  const page = pageParam ? Number(pageParam) : 1;

  if (Number.isNaN(page) || page <= 0) return notFound();

  const state = await getApprovalsAction(page, 5);
  if (!state.success) return notFound();

  return (
    <div className="flex flex-col gap-6 flex-1">
      <h1 className="text-2xl font-bold text-white">강의 검토</h1>
      <AuditTable lecturesData={state.data!} />
    </div>
  );
}
