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
import { CreatorLecture } from '../../types';

interface LectureDropdownProps {
  lecture: CreatorLecture;
}

export default function LectureDropdown({ lecture }: LectureDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <MoreVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-20" align="end">
        <DropdownMenuItem>
          <Edit />
          강의 수정
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Trash className="text-red-500" />
          <span className="text-red-500 hover:text-red-500">강의 삭제</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
