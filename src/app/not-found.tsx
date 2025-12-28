import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FileQuestion } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-80px)] flex-col items-center justify-center p-6 text-center">
      <div className="mb-4 rounded-full bg-zinc-100 p-4 dark:bg-zinc-800">
        <FileQuestion className="h-8 w-8 text-zinc-900 dark:text-zinc-50" />
      </div>
      <h2 className="mb-2 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
        404 - 페이지를 찾을 수 없습니다
      </h2>
      <p className="mb-8 max-w-sm text-zinc-500 dark:text-zinc-400">
        찾으시는 페이지가 삭제되었거나 주소가 잘못 입력되었을 수 있습니다.
      </p>
      <Button
        asChild
        className="bg-zinc-900 text-zinc-50 hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
      >
        <Link href="/">메인으로 돌아가기</Link>
      </Button>
    </div>
  );
}
