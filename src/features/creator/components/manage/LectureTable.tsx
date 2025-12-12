import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { CreatorLecture } from '../../types';
import LectureRow from './LectureRow';

interface LectureTableProps {
  lectures: CreatorLecture[];
}

export default function LectureTable({ lectures }: LectureTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="min-w-40 w-[10%]">썸네일</TableHead>
          <TableHead className="w-[40%]">강의명</TableHead>
          <TableHead>카테고리</TableHead>
          <TableHead>상태</TableHead>
          <TableHead>수강생</TableHead>
          <TableHead>평점</TableHead>
          <TableHead>관리</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {lectures.map((lecture) => (
          <LectureRow key={lecture.id} lecture={lecture} />
        ))}
      </TableBody>
    </Table>
  );
}
