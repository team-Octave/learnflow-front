'use client';

import { useEffect, useState } from 'react';
import { Sparkles, PlayCircle } from 'lucide-react';
import type { AILessonSummaryResponse } from '../../types';
import { getAILessonSummaryAction } from '@/features/lectures/actions';

interface AISummaryBoxProps {
  selectedLessonId: number | null;
}

/* 3가지 상태만 유지
IDLE: 레슨 아직 안 고름 /COMPLETED: 요약 보여줌 / EMPTY: 요약 없음/실패*/
type UiState = 'IDLE' | 'COMPLETED' | 'EMPTY';

export default function AISummaryBox({ selectedLessonId }: AISummaryBoxProps) {
  // 서버에서 받아온 요약 응답을 저장
  const [data, setData] = useState<AILessonSummaryResponse | null>(null);
  const [uiState, setUiState] = useState<UiState>('IDLE');
  // READY/PROCESSING일 때 "아무 UI도 안 보이게" 처리
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    async function load() {
      // 레슨 선택 전
      if (!selectedLessonId) {
        setHidden(false);
        setData(null);
        setUiState('IDLE');
        return;
      }

      // 선택 직후: 일단 이전 데이터 제거
      setData(null);
      setHidden(false);

      try {
        // 서버에서 요약 가져오기 :요약 요청하고,
        const state = await getAILessonSummaryAction(selectedLessonId);

        // API 자체가 실패했거나 데이터가 비어있으면 “요약 없음” UI.
        if (!state.success || !state.data) {
          setUiState('EMPTY');
          return;
        }

        // 성공하면 data 저장
        const res = state.data;
        setData(res);

        // READY / PROCESSING이면 숨김 처리
        if (res.status === 'READY' || res.status === 'PROCESSING') {
          setHidden(true);
          return;
        }

        // COMPLETED + content 있음 → 요약 보임
        if (res.status === 'COMPLETED' && res.content) {
          setUiState('COMPLETED');
          return;
        }

        // FAILED / NOT_FOUND / 그 외 → 요약 없음
        setUiState('EMPTY');
      } catch {
        setUiState('EMPTY');
      }
    }

    load();
  }, [selectedLessonId]);

  // READY/PROCESSING일 때는 박스 자체를 숨김
  if (hidden) return null;

  // COMPLETED이면서 content가 있을 때만 “요약 UI”로 들어가게 하는 안전 체크.
  const isCompleted = uiState === 'COMPLETED' && data?.content;

  return (
    <div className="sticky top-24 bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 backdrop-blur-sm min-h-80">
      <div className="flex items-center gap-2 mb-4 text-yellow-400">
        <Sparkles className="w-5 h-5 fill-yellow-400" />
        <h2 className="font-bold text-lg text-white">AI 영상 요약</h2>
      </div>

      {uiState === 'IDLE' ? (
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
      ) : isCompleted ? (
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
      ) : (
        <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-lg">
          <p className="text-sm text-zinc-300">
            해당 레슨에 대한 요약이 아직 생성되지 않았습니다.
          </p>
        </div>
      )}
    </div>
  );
}
