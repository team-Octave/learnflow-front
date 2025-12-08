import { Progress } from '@/components/ui/progress';

interface ProgressBarProps {
  progress: number;
}

export default function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <div className="flex justify-between text-xs font-light text-zinc-500">
        <div>진도율</div>
        <div>{progress}%</div>
      </div>
      <Progress value={progress} className="w-full" />
    </div>
  );
}
