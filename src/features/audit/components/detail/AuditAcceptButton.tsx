// src/features/audit/components/detail/AuditAcceptButton.tsx
'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { approveAuditAction } from '@/features/audit/actions';
import { useState } from 'react';

interface AuditAcceptButtonProps {
  auditId: string | number;
}

export default function AuditAcceptButton({ auditId }: AuditAcceptButtonProps) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  const onApprove = async () => {
    if (pending) return;
    setPending(true);

    const state = await approveAuditAction(String(auditId));

    if (!state.success) {
      toast.error(state.message ?? '승인에 실패했습니다.');
      setPending(false);
      return;
    }

    toast.success('강의가 승인되었습니다.');
    router.push('/admin/audit');
    router.refresh();
  };

  return (
    <Button
      size="lg"
      className="w-32 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20"
      onClick={onApprove}
      disabled={pending}
    >
      승인
    </Button>
  );
}
