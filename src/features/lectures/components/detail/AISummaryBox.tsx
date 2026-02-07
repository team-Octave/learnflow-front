// features/lectures/components/detail/AISummaryBox.tsx
//  (AI 영상 요약 부분)

'use client';

import { Sparkles, PlayCircle } from 'lucide-react';

interface AISummaryBoxProps {
  // 레슨 클릭 전 → null
  // 레슨 클릭 후 → 1, 2, 3 같은 숫자
  selectedLessonId: number | null;
}

// { selectedLessonId } selectedLessonId를 props로 받음
export default function AISummaryBox({ selectedLessonId }: AISummaryBoxProps) {
  return (
    <div className="sticky top-24 bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-4 text-yellow-400">
        <Sparkles className="w-5 h-5" />
        <h3 className="font-bold text-lg text-white">AI 영상 요약</h3>
      </div>

{/*  조건부 렌더링 {selectedLessonId ? ( selectedLessonId가 있을때 ) : ( selectedLessonId없을때 )} */}
      {selectedLessonId ? (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-lg">
            <h4 className="font-medium text-indigo-300 mb-2 flex items-center gap-2">
              <PlayCircle className="w-4 h-4" />
              선택된 레슨 요약
            </h4>
            <p className="text-sm text-zinc-300 leading-relaxed">
              {/* TODO: 나중에 API 연결해서 내용 넣기 */}
              레슨 요약이 여기에 표시됩니다.
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center space-y-3">
          <div className="p-3 bg-zinc-800/50 rounded-full">
            <PlayCircle className="w-8 h-8 text-zinc-600" />
          </div>
          <div>
            <p className="text-zinc-400 font-medium">레슨을 선택해주세요</p>
            <p className="text-xs text-zinc-500 mt-1">
              레슨을 클릭하면 AI의 강의 요약을
              <br />
              확인할 수 있어요
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
