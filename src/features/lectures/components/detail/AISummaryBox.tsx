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
  const [showLoading, setShowLoading] = useState(false); // ✅ 1초 이상일 때만 true
  const [summary, setSummary] = useState<AILessonSummary | null>(null);
  const [notReady, setNotReady] = useState(false);

  useEffect(() => {
    let alive = true;
    let timer: ReturnType<typeof setTimeout> | null = null;

    async function load() {
      if (!selectedLessonId) {
        setSummary(null);
        setNotReady(false);
        setLoading(false);
        setShowLoading(false);
        return;
      }

      // ✅ 새 레슨 클릭 시: 일단 상태 초기화
      setLoading(true);
      setShowLoading(false);
      setNotReady(false);
      setSummary(null);

      // ✅ 1초 이상 로딩이 지속될 때만 로딩 문구 표시
      timer = setTimeout(() => {
        if (alive) setShowLoading(true);
      }, 1000);

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
        setShowLoading(false);

        if (timer) {
          clearTimeout(timer);
          timer = null;
        }
      }
    }

    load();

    return () => {
      alive = false;
      if (timer) clearTimeout(timer);
    };
  }, [lectureId, selectedLessonId]);

  return (
    <div className="sticky top-24 bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-4 text-yellow-400">
        <Sparkles className="w-5 h-5" />
        <h3 className="font-bold text-lg text-white">AI 영상 요약</h3>
      </div>

      {/* ✅ 레슨 선택 전 */}
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
      ) : loading ? (
        // ✅ 로딩 중: 1초 넘기 전엔 아무 UI도 안 바뀌게(깜빡임 방지)
        showLoading ? (
          <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-lg">
            <p className="text-sm text-zinc-300">요약을 불러오는 중입니다...</p>
          </div>
        ) : (
          // 1초 전까지는 빈 자리만 유지 (원하면 스켈레톤 넣어도 됨)
          <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-lg">
            <p className="text-sm text-zinc-300 opacity-0">
              요약을 불러오는 중입니다...
            </p>
          </div>
        )
      ) : summary ? (
        // ✅ 성공: 요약 표시
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-lg">
            <h4 className="font-medium text-indigo-300 mb-2 flex items-center gap-2">
              <PlayCircle className="w-4 h-4" />
              {summary.title}
            </h4>

            <p className="text-sm text-zinc-300 leading-relaxed">
              {summary.summary}
            </p>

            <ul className="mt-3 list-disc pl-5 text-sm text-zinc-300 space-y-1">
              {summary.keyTakeaways.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : notReady ? (
        // ✅ 로딩 끝났는데 실패/없음일 때만
        <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-lg">
          <p className="text-sm text-zinc-300">
            요약이 아직 생성되지 않았습니다.
          </p>
        </div>
      ) : (
        // ✅ (예외) 여기까지 올 일 거의 없음: 안전망
        <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-lg">
          <p className="text-sm text-zinc-300">
            요약이 아직 생성되지 않았습니다.
          </p>
        </div>
      )}
    </div>
  );
}
