// src/features/audit/components/detail/AuditAcceptButton.tsx
'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { approveAuditAction } from '@/features/audit/actions';

interface AuditAcceptButtonProps {
  auditId: string | number;
}

export default function AuditAcceptButton({ auditId }: AuditAcceptButtonProps) {
  const router = useRouter();

  const onApprove = async () => {
    const confirmed = confirm('강의를 승인하시겠습니까?');
    if (!confirmed) return;

    const state = await approveAuditAction(String(auditId));

    if (!state.success) {
      toast.error(state.message ?? '승인에 실패했습니다.');
      return;
    }

    toast.success('강의가 승인되었습니다.');
    router.push('/admin/audit');
  };

  return (
    <Button
      size="lg"
      className="w-32 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 cursor-pointer"
      onClick={onApprove}
    >
      승인
    </Button>
  );
}
