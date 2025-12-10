import { Button } from '@/components/ui/button';
import CurriculumForm from '@/features/creator/components/form/CurriculumForm';
import LectureForm from '@/features/creator/components/form/LectureForm';
import StepInfo from '@/features/creator/components/form/StepInfo';
import { CreatorLecture } from '@/features/creator/types';
import { getParam } from '@/lib/utils';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

interface LectureEditPageProps {
  params: Promise<{ id: string }>;
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function LectureEditPage({
  params,
  searchParams,
}: LectureEditPageProps) {
  const { id } = await params;
  // const lecture = await getLectureById(id) 가져와서 props로 넘겨주기
  const lecture: CreatorLecture = {
    lectureId: 'lec_uuid_v4_12345',
    lectureTitle: '실전! 모던 리액트(React) 마스터 클래스',
    lectureDesctiption:
      '최신 리액트 문법부터 상태 관리(Redux, Recoil)까지, 실무에서 바로 쓸 수 있는 노하우를 담았습니다.',
    category: 'FRONTEND',
    level: 'INTERMEDIATE',
    thumbnailURL: 'https://cdn.example.com/thumbnails/react-advanced.png',
    status: true,
    enrollmentCount: 3420,
    rating: 4.8,
    curriculum: [
      {
        chapterId: 'ch_01',
        chapterTitle: '섹션 1. 리액트의 핵심 개념',
        chapterOrder: 1,
        lessons: [
          {
            lessonId: 'les_01_01',
            lessonTitle: 'Virtual DOM과 리렌더링의 이해',
            lessonOrder: 1,
            lessonType: 'VIDEO',
            videoURL: '',
            duration: '15:30',
          },
          {
            lessonId: 'les_01_02',
            lessonTitle: '핵심 개념 퀴즈',
            lessonOrder: 2,
            lessonType: 'QUIZ',
            questions: [
              {
                questionId: 'q_01_01',
                questionText:
                  'React는 데이터 변경 시 실제 DOM을 즉시 업데이트한다.',
                questionOrder: 1,
                answer: 'X', // Virtual DOM 비교 후 변경사항만 반영하므로 X
              },
              {
                questionId: 'q_01_02',
                questionText:
                  'JSX에서 class 속성 대신 className을 사용해야 한다.',
                questionOrder: 2,
                answer: 'O',
              },
            ],
          },
        ],
      },
      {
        chapterId: 'ch_02',
        chapterTitle: '섹션 2. Hooks 완벽 정복',
        chapterOrder: 2,
        lessons: [
          {
            lessonId: 'les_02_01',
            lessonTitle: 'useEffect의 의존성 배열 관리',
            lessonOrder: 1,
            lessonType: 'VIDEO',
            videoURL: '',
            duration: '12:45',
          },
          {
            lessonId: 'les_02_02',
            lessonTitle: 'useMemo와 useCallback을 통한 최적화',
            lessonOrder: 2,
            lessonType: 'VIDEO',
            videoURL: '',
            duration: '18:20',
          },
        ],
      },
    ],
  };

  const stepString = getParam((await searchParams).step) || '1';
  const step = parseInt(stepString);

  return (
    <div className="flex flex-col mx-auto my-12 gap-8 w-[80%] md:w-[60%] ">
      <div className="flex justify-between items-center">
        {step === 1 ? (
          <>
            <div className="flex gap-2 items-center">
              <Link href={'/creator'} replace>
                <ChevronLeft />
              </Link>
              <div className="text-2xl font-bold text-white">강의 수정</div>
            </div>
            {/* form id 지정 후 서버액션으로 할 것 */}
            <Button
              className="bg-white hover:bg-white/90 cursor-pointer"
              form=""
            >
              저장하고 다음
            </Button>
          </>
        ) : (
          <>
            <div className="flex gap-2 items-center">
              <Link href={'/creator'} replace>
                <ChevronLeft />
              </Link>
              <div className="text-2xl font-bold text-white">커리큘럼</div>
            </div>{' '}
            <div className="flex gap-2">
              <Link href={`/creator/${id}?step=1`}>
                <Button variant="outline" className="cursor-pointer">
                  이전 단계
                </Button>
              </Link>
              {/* form id 지정 후 서버액션으로 할 것 */}
              <Button className="bg-white hover:bg-white/90 cursor-pointer">
                저장하기
              </Button>
            </div>
          </>
        )}
      </div>
      <StepInfo step={step} />
      {step === 1 ? (
        <LectureForm lecture={lecture} />
      ) : (
        <CurriculumForm lecture={lecture} />
      )}
    </div>
  );
}
