import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';

export default function LectureAddButton() {
  return (
    <Link href="/creator/new">
      <Button variant={'default'}>
        <Plus />새 강의 등록
      </Button>
    </Link>
  );
}
