// src/features/audit/components/detail/AuditReturnButton.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { rejectAuditAction } from '@/features/audit/actions';

interface AuditReturnButtonProps {
  auditId: string | number;
}

const REJECTION_REASONS = [
  '영상 화질/음질 부적합',
  '컨텐츠 내용 부족',
  '저작권 위반 의심',
  '커리큘럼 불일치',
  '부적절한 내용 포함',
];

export default function AuditReturnButton({ auditId }: AuditReturnButtonProps) {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [selectedReasons, setSelectedReasons] = useState<string[]>([]);
  const [detail, setDetail] = useState('');
  const [pending, setPending] = useState(false);

  const handleReasonChange = (reason: string, checked: boolean) => {
    setSelectedReasons((prev) =>
      checked ? [...prev, reason] : prev.filter((r) => r !== reason),
    );
  };

  const onReject = async () => {
    if (pending) return;
    setPending(true);

    const state = await rejectAuditAction(String(auditId), {
      reasons: selectedReasons,
      detail: detail.trim() || undefined,
    });

    if (!state.success) {
      toast.error(state.message ?? '반려에 실패했습니다.');
      setPending(false);
      return;
    }

    toast.error('강의가 반려되었습니다.');
    setOpen(false);
    router.push('/admin/audit');
    router.refresh();
  };

  const disabled =
    pending || (selectedReasons.length === 0 && detail.trim().length === 0);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="lg"
          className="w-32 border-destructive/50 text-destructive hover:bg-destructive/10 hover:text-destructive hover:border-destructive"
        >
          반려
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>강의 반려 사유 입력</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-3">
            <Label className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              반려 사유 선택
            </Label>

            <div className="space-y-2">
              {REJECTION_REASONS.map((reason) => (
                <div key={reason} className="flex items-center space-x-2">
                  <Checkbox
                    id={reason}
                    checked={selectedReasons.includes(reason)}
                    onCheckedChange={(checked) =>
                      handleReasonChange(reason, Boolean(checked))
                    }
                    className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                  <Label
                    htmlFor={reason}
                    className="font-normal cursor-pointer text-zinc-600 dark:text-zinc-300"
                  >
                    {reason}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              상세 사유
            </Label>
            <Textarea
              placeholder="상세한 반려 사유를 입력해주세요. 강사에게 전달됩니다."
              className="h-32 resize-none focus-visible:ring-primary"
              maxLength={200}
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
            />
            <div className="text-xs text-muted-foreground text-right font-mono">
              {detail.length} / 200
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            variant="ghost"
            onClick={() => setOpen(false)}
            disabled={pending}
          >
            취소
          </Button>
          <Button variant="destructive" onClick={onReject} disabled={disabled}>
            최종 반려
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
