'use client';

import { useEffect, useState } from 'react';
import { Sparkles, PlayCircle } from 'lucide-react';
import type { AILessonSummaryResponse } from '../../types';
import { getAILessonSummaryAction } from '@/features/lectures/actions';

interface AISummaryBoxProps {
  selectedLessonId: number | null;
}

/*IDLE: 레슨 선택 전(안내 UI 보여줌)
HIDDEN: READY/PROCESSING이거나, 선택 직후 “규칙상 UI 숨김”(컴포넌트 return null
COMPLETED: 요약 완료 UI
EMPTY: 실패/없음 UI(문구 노출)*/

type UiState = 'IDLE' | 'HIDDEN' | 'COMPLETED' | 'EMPTY';

export default function AISummaryBox({ selectedLessonId }: AISummaryBoxProps) {
  // data: 서버에서 내려온 AI 요약 데이터(성공 시 저장)
  const [data, setData] = useState<AILessonSummaryResponse | null>(null);
  const [uiState, setUiState] = useState<UiState>('IDLE');

  useEffect(() => {
    let alive = true; //이 effect가 살아있는지 표시하는 플래그

    async function load() {
      // 레슨 선택 전: 안내 UI
      if (!selectedLessonId) {
        setData(null);
        setUiState('IDLE');
        return;
      }

      // 선택 직후: 일단 UI 숨김(READY/PROCESSING 포함 규칙을 지키기 위해)
      setData(null);
      setUiState('HIDDEN');

      try {
        const state = await getAILessonSummaryAction(selectedLessonId);
        if (!alive) return;

        // 실패/없음 취급 → 메시지 노출
        if (!state.success || !state.data) {
          setUiState('EMPTY');
          return;
        }

        // 성공이면 data 저장 + status로 분기
        const res = state.data;
        setData(res);

        // COMPLETED + content 있음 → 완료 UI
        if (res.status === 'COMPLETED' && res.content) {
          setUiState('COMPLETED');
          return;
        }

        if (res.status === 'FAILED' || res.status === 'NOT_FOUND') {
          setUiState('EMPTY');
          return;
        }

        // READY / PROCESSING → 아무 UI도 안 띄움
        if (res.status === 'READY' || res.status === 'PROCESSING') {
          setUiState('HIDDEN');
          return;
        }

        // 혹시 모를 예외 status 방어
        setUiState('HIDDEN');
      } catch {
        if (!alive) return;
        setUiState('EMPTY');
      }
    }

    load();
    return () => {
      alive = false;
    };
  }, [selectedLessonId]);

  // READY/PROCESSING일 때는 “컨테이너(박스)” 자체를 렌더하지 않음
  if (uiState === 'HIDDEN') return null;

  // UI 상태가 완료(COMPLETED)이고, 데이터에 content가 있으면 그 content를 결과로 쓰고, 아니면 false(또는 undefined)로 둔다
  const isCompleted = uiState === 'COMPLETED' && data?.content;

  return (
    <div className="sticky top-24 bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 backdrop-blur-sm min-h-80">
      <div className="flex items-center gap-2 mb-4 text-yellow-400 ">
        <Sparkles className="w-5 h-5 fill-yellow-400" />
        <h3 className="font-bold text-lg text-white">AI 영상 요약</h3>
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
        //  FAILED / NOT_FOUND 또는 요청 실패 → 문구 노출
        <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-lg">
          <p className="text-sm text-zinc-300">
            해당 레슨에 대한 요약이 아직 생성되지 않았습니다.
          </p>
        </div>
      )}
    </div>
  );
}
