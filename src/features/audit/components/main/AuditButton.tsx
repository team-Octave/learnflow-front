'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

type Props = {
  lectureId: number;
};

export default function AuditButton({ lectureId }: Props) {
  return (
    <Button asChild size="sm" className="rounded-full">
      <Link href={`/admin/audit/${lectureId}`}>검토</Link>
    </Button>
  );
}
