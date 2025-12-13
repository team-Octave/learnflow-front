import { TableCell, TableRow } from '@/components/ui/table';
import { Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { CreatorLecture } from '../../types';
import LectureDropdown from './LectureDropdown';
import { CATEGORY_MAP } from '@/features/lectures/types';

interface LectureRowProps {
  lecture: CreatorLecture;
}

export default function LectureRow({ lecture }: LectureRowProps) {
  return (
    <TableRow>
      <TableCell>
        <AspectRatio ratio={16 / 9} className="bg-muted rounded-lg">
          <img
            src={lecture.thumbnailUrl}
            alt="강의 썸네일"
            className="h-full w-full rounded-lg object-cover "
          />
        </AspectRatio>
      </TableCell>
      <TableCell>{lecture.title}</TableCell>
      <TableCell>
        <Badge className="bg-zinc-950 hover:bg-zinc-900 border-white text-white  flex items-center">
          {CATEGORY_MAP[lecture.categoryId]}
        </Badge>
      </TableCell>
      <TableCell>{lecture.statusDisplayName}</TableCell>
      <TableCell>
        {lecture.enrollmentCount ? lecture.enrollmentCount.toLocaleString() : 0}
        명
      </TableCell>
      <TableCell>
        <div className="text-amber-300 flex h-full items-center gap-1">
          <Star className="fill-amber-300 text-amber-300" />
          {lecture.ratingAverage ? lecture.ratingAverage.toFixed(1) : '0.0'}
        </div>
      </TableCell>
      <TableCell>
        <LectureDropdown lectureId={lecture.id} lectureTitle={lecture.title} />
      </TableCell>
    </TableRow>
  );
}
