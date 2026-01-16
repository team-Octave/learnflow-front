//  레슨 + 수강정보   API 동시 호출
// /play/33/65?lessonId=1
/*
수강(enrollment) 정보 + 레슨(lesson) 정보를 동시에 조회해서
현재 레슨이 VIDEO인지 QUIZ인지에 따라 화면을 분기 렌더링하는 페이지
*/

// app/play/[enrollmentId]/[lectureId]/page.tsx
import { notFound, redirect } from 'next/navigation';
import { Video } from '@/features/learning/components/play/Video';
import { Quiz } from '@/features/learning/components/play/Quiz';
import { getLessonByIdAction } from '@/features/lectures/actions';
import { getEnrollmentByIdAction } from '@/features/learning/actions';
import type { Lesson } from '@/features/lectures/types';
import type { Enrollment } from '@/features/learning/types';

// lessonId는 URL 구조상 필수가 아니라 searchParams로 관리
interface PlayPageProps {
  // params → URL 경로에 있는 동적 세그먼트
  params: Promise<{ enrollmentId: string; lectureId: string }>; // /play/[enrollmentId]/[lectureId] /play/33/65
  // searchParams → URL 뒤에 붙는 쿼리스트링
  searchParams: Promise<{ lessonId?: string }>; // ? 붙어있음 → 있을 수도, 없을 수도 있음   ?lessonId=121
}

// lectureId = 강의 자체의 ID
// enrollmentId = “내가 그 강의를 수강 중이다”라는 기록의 ID

// async → 서버에서 실행되는 비동기 컴포넌트
export default async function PlayPage({
  // Next.js가 자동으로 넘겨주는 props
  // 타입은 우리가 정의한 PlayPageProps
  params,
  searchParams,
}: PlayPageProps) {
  // 3️ params / searchParams 추출
  const { enrollmentId, lectureId } = await params; // await : Server Component에서 params는 Promise
  const { lessonId } = await searchParams; //쿼리스트링 처리

  // 4️⃣ 필수 값 검증 (가드)
  // 하나라도 없으면 정상적인 수강 페이지가 아님
  // 잘못된 접근 → 내 학습 페이지로 강제 이동
  if (!enrollmentId || !lectureId || !lessonId) {
    redirect('/mylearning');
  }

  // 5️⃣ 레슨 + 수강 정보 동시 호출
  const [lessonState, enrollmentState] = await Promise.all([
    getLessonByIdAction(parseInt(lectureId), parseInt(lessonId)), //현재 레슨 단건 조회
    getEnrollmentByIdAction(parseInt(enrollmentId)), //수강 진행 정보 조회
  ]);

  // 6️⃣ 레슨 조회 실패 처리
  // 레슨이 없으면 페이지 자체가 성립 불가 → 404 페이지 출력
  //lessonState가 없거나, 요청이 성공이 아니거나, data가 없으면 → 404 페이지로 보낸다
  if (!lessonState?.success || !lessonState.data) {
    console.error('[PlayPage] lesson load failed:', lessonState?.message);
    return notFound();
  }

  // 7️⃣ 수강 정보 실패 처리
  // enrollmentId = “내가 그 강의를 수강 중이다”라는 기록의 ID
  // 수강 정보가 없다는 건
  if (!enrollmentState?.success || !enrollmentState.data) {
    console.error(
      '[PlayPage] enrollment load failed:',
      enrollmentState?.message,
    );
    redirect('/mylearning'); //→ 내 학습 페이지로 쫓아냄
  }

  // 8️⃣ 타입 명확화(API 응답을 실제로 쓰기 위한 타입 확정 단계)
  // 이 시점부터 이 값은 확실히 Lesson / Enrollment다
  // 타입스크립트에게 확정 선언하는 코드
  // as Lesson / as Enrollment => 타입 단언
  // lessonState.data는 이제 확실히 Lesson 객체니까 Lesson 타입으로 취급해라
  const currentLesson = lessonState.data as Lesson;
  const enrollmentInfo = enrollmentState.data as Enrollment;

  // 9️⃣ 레슨 완료 여부 계산
  // 완료된 레슨 ID 목록 안에 현재 lessonId(숫자로 변환한 값)가 있으면 → 이 레슨은 이미 완료됨
  // enrollmentInfo.completedLessonIds: 수강 정보(enrollment) 안에 들어있는 이미 완료한 레슨 ID 목록
  const isCompleted = enrollmentInfo.completedLessonIds.includes(
    // 배열.includes(값) : 배열 안에 그 값이 있으면 true, 없으면 false
    parseInt(lessonId), //parseInt : lessonId 문자열 → 숫자로 변환 필요
  );

  return (
    <main className="flex-1 flex items-center">
      {currentLesson.lessonTypeDisplayName === 'VIDEO' ? (
        <Video
          enrollmentId={parseInt(enrollmentId)}
          lesson={currentLesson}
          completedLessonIds={enrollmentInfo.completedLessonIds}
        />
      ) : (
        <Quiz
          enrollmentId={parseInt(enrollmentId)}
          lesson={currentLesson}
          isCompleted={isCompleted}
        />
      )}
    </main>
  );
}
