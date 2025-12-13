'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Edit, MoreVertical, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { deleteCreatorLectureAction } from '../../actions';

interface LectureDropdownProps {
  lectureId: number;
  lectureTitle: string;
}

export default function LectureDropdown({
  lectureId,
  lectureTitle,
}: LectureDropdownProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const handleEdit = () => {
    router.push(`/creator/${lectureId}`);
  };

  const handleDelete = () => {
    if (confirm(`${lectureTitle} 강의를 정말 삭제하시겠습니까?`)) {
      startTransition(async () => {
        const response = await deleteCreatorLectureAction(lectureId);
        if (!response.success) {
          alert(response.error);
          return;
        } else {
          alert(`${lectureTitle} 강의가 성공적으로 삭제되었습니다.`);
          router.refresh();
        }
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <MoreVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-20" align="end">
        <DropdownMenuItem
          onClick={handleEdit}
          className="cursor-pointer"
          disabled={isPending}
        >
          <Edit />
          강의 수정
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleDelete}
          className="cursor-pointer"
          disabled={isPending}
        >
          <Trash className="text-red-500" />
          <span className="text-red-500 hover:text-red-500">강의 삭제</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
