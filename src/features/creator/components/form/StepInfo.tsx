import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

interface StepInfoProps {
  step: number;
}

export default function StepInfo({ step }: StepInfoProps) {
  return (
    <div className="flex w-full text-zinc-500 gap-4 items-center">
      <div className="flex items-center gap-2">
        <div className="flex border-2 w-8 h-8 rounded-full items-center justify-center border-indigo-500 text-indigo-500">
          1
        </div>
        <span className="text-indigo-500">기본 정보</span>
      </div>
      <div className="w-8 h-[1px] bg-zinc-800"></div>
      <div
        className={cn(
          'flex items-center gap-2',
          step === 2 && 'text-indigo-500',
        )}
      >
        <div
          className={cn(
            'flex border-2 w-8 h-8 rounded-full items-center justify-center',
            step === 2 && 'border-indigo-500 text-indigo-500',
          )}
        >
          2
        </div>
        <span>커리큘럼 정보</span>
      </div>
    </div>
  );
}
