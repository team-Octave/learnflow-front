import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { CreatorLecture } from '../../types';
import LectureRow from './LectureRow';
import CreatorPagination from './CreatorPagination';

interface LectureTableProps {
  lecturesData: any;
}

export default function LectureTable({ lecturesData }: LectureTableProps) {
  const lectures = lecturesData.content;

  return (
    <>
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
          {lectures.map((lecture: CreatorLecture) => (
            <LectureRow key={lecture.id} lecture={lecture} />
          ))}
        </TableBody>
      </Table>
      <CreatorPagination
        currentPage={lecturesData.pageable.pageNumber + 1}
        totalPages={lecturesData.totalPages}
      />
    </>
  );
}
