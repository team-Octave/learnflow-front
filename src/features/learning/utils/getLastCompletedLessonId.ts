export function getLastCompletedLessonId(): string | null {
  try {
    const stored = localStorage.getItem('completedLessons');
    if (!stored) return null;

    const list: string[] = JSON.parse(stored);
    if (list.length === 0) return null;

    // 저장된 순서가 완료 순서니까 마지막 값을 반환
    return list[list.length - 1];
  } catch {
    return null;
  }
}
