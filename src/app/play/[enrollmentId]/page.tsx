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
  const { enrollmentId } = await params;
  const { lectureId, lessonId } = await searchParams;

  // 4) 필수 값 없으면 리다이렉트
  // URL에 필요한 값이 하나라도 없으면 “수강 정보 없음” 처리 후 /mylearning으로 보내기.
  if (!enrollmentId || !lessonId || !lectureId) {
    alert('수강 정보가 없습니다.');
    // @ 서버 컴포넌트에서 alert()는 동작하지 않습니다. (브라우저 API라서)
    redirect('/mylearning');
  }

  // Promise.all로 두 요청을 동시에 실행해서 성능을 올립니다.
  const [enrollmentState, lectureState] = await Promise.all([
    // parseInt(...)로 string을 number로 변환해서 Action에 전달합니다.
    // parseInt는 문자열(string)을 정수(number)로 변환해주는 자바스크립트 함수
    getEnrollmentByIdAction(parseInt(enrollmentId)),
    getLectureByIdAction(parseInt(lectureId)),
  ]);

  // 조회 실패 처리 (404)
  // || 는 둘 중 하나라도 true이면 전체가 true
  if (!enrollmentState.success || !lectureState.success) {
    //둘 중 하나라도 실패하면:
    console.log(enrollmentState.message || lectureState.message); //메시지 로그 남기고
    return notFound(); //notFound()로 404 페이지를 띄움 (Next.js App Router 기본)
  }

  // 데이터 꺼내기 (타입 단언)
  /*
    enrollmentState.data → 어떤 타입인지 컴파일 시점에 명확하지 않은 값
    as Enrollment → “이 값은 Enrollment 타입이라고 내가 확신한다”라고 TypeScript에게 알려주는 것
   */
  // enrollmentInfo 변수는 Enrollment 타입으로 취급됨
  // as Type은 타입 변환이 아니라 타입 강제 지정
  const enrollmentInfo = enrollmentState.data as Enrollment;
  const lecture = lectureState.data as Lecture;

  // 2) 전체 레슨을 flat 구조로 변환
  // 레슨 전체를 “일렬(flat)”로 펴기
  // 모든 챕터(chapter)에 들어있는 레슨(lesson)들을 하나의 배열로 모으는 코드
  const allLessons = lecture.chapters!.flatMap(
    // chapters! 는 null이나 undefined가 아니다”라고 TypeScript에게 강제로 알려주는 것
    // TypeScript에게 이렇게 말하는 효과 : lecture.chapters는 반드시 존재한다!
    (chapter: Chapter) => chapter.lessons,
  );

  // 3) URL의 lessonId와 일치하는 레슨 찾기
  const currentLesson = allLessons.find(
    (l: Lesson) => Number(l.id) === Number(lessonId),
  );
  /*
  URL의 lessonId와 일치하는 레슨을 find로 찾습니다.

Number(...)로 타입 맞춰 비교합니다.

⚠️ 여기서 currentLesson이 없을 수도 있는데(잘못된 lessonId),
아래에서 currentLesson!을 쓰고 있어서 없으면 바로 터집니다.
*/

  // 4) 비디오 / 퀴즈 타입 분기
  const isVideoLesson = currentLesson!.lessonTypeDisplayName === 'VIDEO';
  // 오류처리 액션 로직 만들어야함 @@
  // currentLesson! : ! 사용 → 레슨이 반드시 존재한다고 가정
  //currentLesson! → 없을 경우 방어 로직 필요 @@

  // 5) 실제 UI 렌더링
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* 상단 타이틀 바 */}
      <TitleBar lectureTitle={lecture.title} />

      <div className="flex flex-1  mx-auto w-full">
        {/* 메인 영역 */}
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

        {/* 오른쪽 사이드 커리큘럼 */}
        <AsideCurriculum
          lecture={lecture}
          currentLessonId={currentLesson!.id}
          enrollmentInfo={enrollmentInfo}
        />
      </div>
    </div>
  );
}
