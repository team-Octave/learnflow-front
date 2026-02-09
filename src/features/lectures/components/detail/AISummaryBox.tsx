'use client';

import { useEffect, useState } from 'react';
import { Sparkles, PlayCircle } from 'lucide-react';
import type { AILessonSummaryResponse } from '../../types';
import { getAILessonSummaryAction } from '@/features/lectures/actions';

interface AISummaryBoxProps {
  selectedLessonId: number | null;
}

export default function AISummaryBox({ selectedLessonId }: AISummaryBoxProps) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<AILessonSummaryResponse | null>(null);
  const [showMessage, setShowMessage] = useState(false); // FAILED/NOT_FOUND만 노출

  useEffect(() => {
    let alive = true;

    async function load() {
      if (!selectedLessonId) {
        setData(null);
        setShowMessage(false);
        setLoading(false);
        return;
      }

      setLoading(true);
      setData(null);
      setShowMessage(false);

      try {
        const state = await getAILessonSummaryAction(selectedLessonId);
        if (!alive) return;

        if (!state.success || !state.data) {
          setShowMessage(true);
          return;
        }

        setData(state.data);

        //  READY/PROCESSING은 아무 UI도 안 띄움
        if (
          state.data.status === 'FAILED' ||
          state.data.status === 'NOT_FOUND'
        ) {
          setShowMessage(true);
        }
      } catch {
        if (!alive) return;
        setShowMessage(true);
      } finally {
        if (!alive) return;
        setLoading(false);
      }
    }

    load();
    return () => {
      alive = false;
    };
  }, [selectedLessonId]);

  const isCompleted = data?.status === 'COMPLETED' && data.content;
  const shouldShowEmptyMessage =
    !loading && selectedLessonId && showMessage && !isCompleted;

  return (
    <div className="sticky top-24 bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 backdrop-blur-sm min-h-80">
      <div className="flex items-center gap-2 mb-4 text-yellow-400 ">
        <Sparkles className="w-5 h-5 fill-yellow-400" />
        <h3 className="font-bold text-lg text-white">AI 영상 요약</h3>
      </div>

      {!selectedLessonId ? (
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
      ) : loading ? null : isCompleted ? (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-lg">
            <h4 className="font-medium text-indigo-300 mb-2 flex items-center gap-2">
              <PlayCircle className="w-4 h-4" />
              AI 요약
            </h4>

            <p className="text-sm text-zinc-300 leading-relaxed">
              {data!.content!.overview}
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-medium text-zinc-500 uppercase tracking-wider">
              Key Takeaways
            </div>

            <ul className="space-y-2">
              {data!.content!.keyTakeaways.map((item, i) => (
                <li
                  key={i}
                  className="text-sm text-zinc-400 flex items-start gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-700 mt-1.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : shouldShowEmptyMessage ? (
        <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-lg">
          <p className="text-sm text-zinc-300">
            해당 레슨에 대한 요약이 아직 생성되지 않았습니다
          </p>
        </div>
      ) : null}
    </div>
  );
}
