import AuditTable from '@/features/audit/components/main/AuditTable';
import { getAuditLecturesAction } from '@/features/audit/actions';
import { getParam } from '@/shared/utils';
import { notFound, redirect } from 'next/navigation';

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function AdminAuditPage({ searchParams }: Props) {
  const sp = await searchParams;

  const pageParam = getParam(sp.page);
  const page = pageParam ? Number(pageParam) : 1;

  if (Number.isNaN(page) || page <= 0) redirect('/admin/audit');

  const state = await getAuditLecturesAction(page);
  if (!state.success) return notFound();

  return (
    <div className="flex flex-col gap-6 flex-1">
      <h1 className="text-2xl font-bold text-white">강의 검토</h1>
      <AuditTable lecturesData={state.data} currentPage={page} />
    </div>
  );
}
