// src/features/lectures/components/detail/AISummaryBox.tsx

'use client';

import { useEffect, useState } from 'react';
import { Sparkles, PlayCircle } from 'lucide-react';
import type { AILessonSummary } from '../../types';
import { getAiLessonSummaryAction } from '@/features/lectures/actions';

interface AISummaryBoxProps {
  lectureId: number;
  selectedLessonId: number | null;
}

export default function AISummaryBox({
  lectureId,
  selectedLessonId,
}: AISummaryBoxProps) {
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<AILessonSummary | null>(null);
  const [notReady, setNotReady] = useState(false);

  useEffect(() => {
    let alive = true;

    async function load() {
      if (!selectedLessonId) {
        setSummary(null);
        setNotReady(false);
        setLoading(false);
        return;
      }

      // 새 레슨 선택 시: 로딩 시작, 결과 초기화
      setLoading(true);
      setSummary(null);
      setNotReady(false);

      try {
        const state = await getAiLessonSummaryAction(
          lectureId,
          selectedLessonId,
        );

        if (!alive) return;

        if (!state.success || !state.data) {
          setNotReady(true);
          return;
        }

        setSummary({
          lessonId: selectedLessonId,
          title: state.data.title,
          summary: state.data.summary,
          keyTakeaways: state.data.keyTakeaways ?? [],
        });
      } catch {
        if (!alive) return;
        setNotReady(true);
      } finally {
        if (!alive) return;
        setLoading(false);
      }
    }

    load();

    return () => {
      alive = false;
    };
  }, [lectureId, selectedLessonId]);

  return (
    <div className="sticky top-24 bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-4 text-yellow-400">
        <Sparkles className="w-5 h-5" />
        <h3 className="font-bold text-lg text-white">AI 영상 요약</h3>
      </div>

      {/* 레슨 선택 전 */}
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
      ) : loading ? // ✅ 로딩 중엔 아무것도 렌더링하지 않음(깜빡이는 보라 박스 제거)
      null : summary ? (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-lg">
            <h4 className="font-medium text-indigo-300 mb-2 flex items-center gap-2">
              <PlayCircle className="w-4 h-4" />
              {summary.title}
            </h4>

            <p className="text-sm text-zinc-300 leading-relaxed">
              {summary.summary}
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-medium text-zinc-500 uppercase tracking-wider">
              Key Takeaways
            </div>

            <ul className="space-y-2">
              {summary.keyTakeaways.map((item, i) => (
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
      ) : notReady ? (
        // 로딩 끝난 후 실패/없음일 때만 표시
        <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-lg">
          <p className="text-sm text-zinc-300">
            해당 레슨에 대한 요약이 아직 생성되지 않았습니다
          </p>
        </div>
      ) : null}
    </div>
  );
}
