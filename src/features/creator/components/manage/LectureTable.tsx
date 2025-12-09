import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { CreatorLecture } from '../../types';
import LectureRow from './LectureRow';

export default function LectureTable() {
  const dummyLectures: CreatorLecture[] = [
    {
      lectureId: 'lec_1001',
      lectureTitle: '실전! React와 Tailwind CSS로 만드는 모던 웹사이트',
      category: 'FRONTEND',
      status: true,
      enrollmentCount: 1240,
      rating: 4.8,
    },
    {
      lectureId: 'lec_1002',
      lectureTitle: 'NestJS로 구축하는 확장 가능한 백엔드 아키텍처',
      category: 'BACKEND',
      status: true,
      enrollmentCount: 850,
      rating: 4.6,
    },
    {
      lectureId: 'lec_1003',
      lectureTitle: 'Python과 PyTorch를 활용한 딥러닝 기초부터 심화까지',
      category: 'AI',
      status: false, // 휴강 또는 비공개 상태 가정
      enrollmentCount: 2300,
      rating: 4.9,
    },
    {
      lectureId: 'lec_1004',
      lectureTitle: 'Unity 3D로 시작하는 나만의 RPG 게임 만들기',
      category: 'GAME',
      status: true,
      enrollmentCount: 560,
      rating: 4.5,
    },
    {
      lectureId: 'lec_1005',
      lectureTitle: 'TypeScript 핸드북: 타입 안정성을 갖춘 자바스크립트',
      category: 'FRONTEND',
      status: true,
      enrollmentCount: 3100,
      rating: 4.7,
    },
  ];

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>썸네일</TableHead>
          <TableHead className="w-[40%]">강의명</TableHead>
          <TableHead>카테고리</TableHead>
          <TableHead>상태</TableHead>
          <TableHead>수강생</TableHead>
          <TableHead>평점</TableHead>
          <TableHead>관리</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {dummyLectures.map((lecture) => (
          <LectureRow key={lecture.lectureId} lecture={lecture} />
        ))}
      </TableBody>
    </Table>
  );
}
