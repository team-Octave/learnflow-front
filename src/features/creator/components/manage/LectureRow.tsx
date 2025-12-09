import { TableCell, TableRow } from '@/components/ui/table';
import { Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { CreatorLecture } from '../../types';
import LectureDropdown from './LectureDropdown';

interface LectureRowProps {
  lecture: CreatorLecture;
}

export default function LectureRow({ lecture }: LectureRowProps) {
  return (
    <TableRow>
      <TableCell>
        <AspectRatio ratio={16 / 9} className="bg-muted rounded-lg">
          <img
            src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
            alt="강의 썸네일"
            className="h-full w-full rounded-lg object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </AspectRatio>
      </TableCell>
      <TableCell>{lecture.lectureTitle}</TableCell>
      <TableCell>
        <Badge className="bg-zinc-950 hover:bg-zinc-900 border-white text-white  flex items-center">
          {lecture.category}
        </Badge>
      </TableCell>
      <TableCell>{lecture.status ? '작성 중' : '공개'}</TableCell>
      <TableCell>{lecture.enrollmentCount.toLocaleString()}명</TableCell>
      <TableCell>
        <div className="text-amber-300 flex h-full items-center gap-1">
          <Star className="fill-amber-300 text-amber-300" />
          {lecture.rating}
        </div>
      </TableCell>
      <TableCell>
        <LectureDropdown lecture={lecture} />
      </TableCell>
    </TableRow>
  );
}
