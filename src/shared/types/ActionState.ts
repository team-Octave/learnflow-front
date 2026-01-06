// action 파일에서 공통적으로 사용할 State
export interface ActionState<T> {
  success: boolean;
  code: string;
  message?: string;
  data?: T;
}
