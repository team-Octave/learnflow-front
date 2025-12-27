export type ErrorCode =
  | 'INVALID_CREDENTIALS' // 이메일 또는 비밀번호 틀림
  | 'REFRESH_TOKEN_INVALID' // 리프레시 토큰 유효하지 않음
  | 'USER_NOT_FOUND' // 사용자를 찾을 수 없음(토큰 내 유저 정보가 DB에 없음)
  | 'EMAIL_DUPLICATED' // 이미 회원가입된 이메일
  | 'NICKNAME_DUPLICATED' // 닉네임 중복
  | 'ENROLLMENT_ALREADY_EXISTS' // 이미 수강중인 강좌
  | 'ENROLLMENT_NOT_FOUND' // 수강 정보가 유효하지 않음
  | 'COMPLETED_LESSON_ALREADY_EXISTS' // 이미 완료 처리된 레슨
  | 'UNAUTHORIZED' // 유저 정보가 유효하지 않음(401: 토큰 갱신 필요)
  | 'FORBIDDEN' // 접근할 수 없는 권한
  | 'NOT_FOUND'; // 기본 실패 코드

// action 함수에서 success가 false 시 던질 커스텀 에러 객체 (code와 message를 담음)
// 컴포넌트에서 에러를 분기 처리하기 위해 사용
export class AppError extends Error {
  public readonly success: boolean = false;
  public readonly code: string;

  constructor(message: string, code: ErrorCode) {
    super(message);

    this.name = 'AppError';
    this.code = code;

    // 인스턴스 확인(instanceof)이 제대로 작동하도록 설정
    Object.setPrototypeOf(this, AppError.prototype);

    // 에러 발생 위치(Stack Trace) 보존
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AppError);
    }
  }
}
