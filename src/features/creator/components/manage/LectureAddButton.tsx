import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';

export default function LectureAddButton() {
  return (
    <Link href="/creator/new">
      <Button className="bg-white hover:bg-white/90 cursor-pointer">
        <Plus />새 강의 등록
      </Button>
    </Link>
  );
}
