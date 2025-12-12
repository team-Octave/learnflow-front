'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { LearningSortOptions } from '../../types';

export default function LearningSort() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSort =
    (searchParams.get('sort') as LearningSortOptions) || 'RECENT-LEARNED';

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', value);
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return (
    <Select value={currentSort} onValueChange={handleSortChange}>
      <SelectTrigger className="w-[130px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="RECENT-LEARNED">최근 학습 순</SelectItem>
        <SelectItem value="RECENT-ENROLLED">최근 신청 순</SelectItem>
      </SelectContent>
    </Select>
  );
}
