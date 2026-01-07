// src/app/play/[enrollmentId]?lectureId=LEC1&lessonId=LES1
import { Chapter, Lecture, Lesson } from '@/features/lectures/types';
import { Enrollment } from '@/features/learning/types';
import { getLectureByIdAction } from '@/features/lectures/actions';
import { TitleBar } from '@/features/learning/components/play/TitleBar';
import { Video } from '@/features/learning/components/play/Video';
import { Quiz } from '@/features/learning/components/play/Quiz';
import { AsideCurriculum } from '@/features/learning/components/play/AsideCurriculum';
import { getEnrollmentByIdAction } from '@/features/learning/actions';
import { notFound, redirect } from 'next/navigation';

/*
흐름 요약(한 줄)
URL 파라미터 파싱 → 수강/강의 데이터 조회 → 레슨 flatten → 현재 레슨 선택 → VIDEO면 Video, 아니면 Quiz 렌더 → 옆에 커리큘럼 표시
*/

// 1) 사용자가 페이지 진입
// URL : /play/[enrollmentId]?lectureId=LEC1&lessonId=LES123
interface PlayPageProps {
  // params: 동적 라우트 경로 파라미터
  params: Promise<{ enrollmentId: string }>;
  // searchParams: 쿼리스트링
  searchParams: Promise<{ lectureId: string; lessonId: string }>; // 강의 ID / 레슨 ID
}

// 2) Next.js가 Server Component인 PlayPage 실행
// async 서버 컴포넌트라서 서버에서 실행되며, params와 searchParams에서 값을 꺼냅니다.
export default async function PlayPage({
  params,
  searchParams,
}: PlayPageProps) {
  // 3) URL에서 값 꺼내기
  const { enrollmentId } = await params; //path param(URL의 “경로(path)” 자체에 포함된 값): enrollmentId
  const { lectureId, lessonId } = await searchParams; //query string(URL 뒤에 ?로 붙는 옵션 값들): lectureId, lessonId

  // 4) 필수 값 없으면 리다이렉트
  // URL에 필요한 값이 하나라도 없으면 “수강 정보 없음” 처리 후 /mylearning으로 보내기.
  if (!enrollmentId || !lessonId || !lectureId) {
    redirect('/mylearning');
  }

  // 5) 수강 정보 + 강의 정보 동시에 가져오기(병렬)
  // Promise.all로 두 요청을 동시에 실행해서 성능을 올립니다.
  const [enrollmentState, lectureState] = await Promise.all([
    // getEnrollmentByIdAction 특정 enrollmentId를 받아서 해당 Enrollment 정보를 조회한 뒤 그대로 반환하는 함수 호출
    getEnrollmentByIdAction(parseInt(enrollmentId)), //enrollmentId로 수강 정보 조회
    // 1단계: 함수 호출
    getLectureByIdAction(parseInt(lectureId)), //lectureId로 강의(챕터/레슨 포함) 조회
    // parseInt(...)로 string을 number로 변환해서 Action에 전달합니다.
  ]);

  // 6) 둘 중 하나라도 실패하면 404 처리
  if (!enrollmentState.success || !lectureState.success) {
    // || 는 둘 중 하나라도 true이면 전체가 true
    //둘 중 하나라도 실패하면:
    console.log(enrollmentState.message || lectureState.message); //메시지 로그 남기고
    return notFound(); //notFound()로 404 페이지를 띄움 (Next.js App Router 기본)
  }

  // 7) 데이터 꺼내기 (타입 단언)
  /*
    enrollmentState.data → 어떤 타입인지 컴파일 시점에 명확하지 않은 값
    as Enrollment → “이 값은 Enrollment 타입이라고 내가 확신한다”라고 TypeScript에게 알려주는 것
   */
  // enrollmentInfo 변수는 Enrollment 타입으로 취급됨
  // as Type은 타입 변환이 아니라 타입 강제 지정
  const enrollmentInfo = enrollmentState.data as Enrollment;
  const lecture = lectureState.data as Lecture;

  // 8) 강의의 모든 레슨을 1차원 배열로 만들기
  // 레슨 전체를 “일렬(flat)”로 펴기 : 모든 챕터(chapter)에 들어있는 레슨(lesson)들을 하나의 배열로 모으는 코드
  const allLessons = lecture.chapters!.flatMap(
    // chapters! 는 null이나 undefined가 아니다”라고 TypeScript에게 강제로 알려주는 것, TypeScript에게 이렇게 말하는 효과 : lecture.chapters는 반드시 존재한다!
    (chapter: Chapter) => chapter.lessons,
  );

  // 9) 현재 레슨 찾기
  // URL의 lessonId와 같은 레슨을 찾아서 currentLesson로 지정
  // Number(...)로 타입 맞춰 비교합니다.
  const currentLesson = allLessons.find(
    (l: Lesson) => Number(l.id) === Number(lessonId),
  );

  // 10) 레슨 타입에 따라 Video / 논리적으로 “VIDEO가 아닌 모든 경우 결정
  const isVideoLesson = currentLesson!.lessonTypeDisplayName === 'VIDEO';
  // lessonTypeDisplayName === 'VIDEO' 👉 VIDEO인지 아닌지만 체크

  // 11) 최종 렌더링(화면 구성)
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* 상단 타이틀 바 */}
      <TitleBar lectureTitle={lecture.title} />

      <div className="flex flex-1  mx-auto w-full">
        {/* 중앙: 메인 영역(Video 또는 Quiz) */}
        <main className="flex-1 flex items-center">
          {isVideoLesson ? (
            <Video enrollmentInfo={enrollmentInfo} lesson={currentLesson!} />
          ) : (
            <Quiz
              enrollmentId={parseInt(enrollmentId)}
              lesson={currentLesson!}
            />
          )}
        </main>

        {/* 우측: 커리큘럼(목차/진도) */}
        <AsideCurriculum
          lecture={lecture}
          currentLessonId={currentLesson!.id}
          enrollmentInfo={enrollmentInfo}
        />
      </div>
    </div>
  );
}
