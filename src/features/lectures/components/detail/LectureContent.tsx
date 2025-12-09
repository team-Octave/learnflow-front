// src/features/lectures/components/detail/LectureContent.tsx

'use client';

import type { Lecture } from '../../types';
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Layers, BarChart3 } from "lucide-react";

interface Props {
  lecture: Lecture;
}

export default function LectureContent({ lecture }: Props) {
  return (
    <section className="space-y-8">
      {/* 강의 소개 */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">강의 소개</h2>
        <p className="text-zinc-300 leading-relaxed">
          {lecture.description}
        </p>
      </div>

      {/* 강의 정보 박스 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* 카테고리 */}
        <div className="bg-zinc-900/40 border border-zinc-800 rounded-lg p-4">
          <p className="text-sm text-zinc-400 mb-1">카테고리</p>
          <Badge className="bg-indigo-500/10 text-indigo-400 border-indigo-500/20">
            {lecture.category}
          </Badge>
        </div>

        {/* 난이도 */}
        <div className="bg-zinc-900/40 border border-zinc-800 rounded-lg p-4">
          <p className="text-sm text-zinc-400 mb-1">난이도</p>
          <div className="flex items-center gap-2 text-zinc-300">
            <BarChart3 className="w-4 h-4 text-indigo-400" />
            <span>
              {lecture.level === "BEGINNER" && "초급"}
              {lecture.level === "INTERMEDIATE" && "중급"}
              {lecture.level === "ADVANCED" && "고급"}
            </span>
          </div>
        </div>

        {/* 총 섹션 수 */}
        <div className="bg-zinc-900/40 border border-zinc-800 rounded-lg p-4">
          <p className="text-sm text-zinc-400 mb-1">총 섹션 수</p>
          <div className="flex items-center gap-2 text-zinc-300">
            <Layers className="w-4 h-4 text-indigo-400" />
            <span>{lecture.curriculum.length}개 섹션</span>
          </div>
        </div>

        {/* 생성일 */}
        <div className="bg-zinc-900/40 border border-zinc-800 rounded-lg p-4">
          <p className="text-sm text-zinc-400 mb-1">생성일</p>
          <div className="flex items-center gap-2 text-zinc-300">
            <CalendarDays className="w-4 h-4 text-indigo-400" />
            <span>{lecture.createdAt}</span>
          </div>
        </div>

        {/* 업데이트일 */}
        <div className="bg-zinc-900/40 border border-zinc-800 rounded-lg p-4">
          <p className="text-sm text-zinc-400 mb-1">업데이트</p>
          <div className="flex items-center gap-2 text-zinc-300">
            <CalendarDays className="w-4 h-4 text-indigo-400" />
            <span>{lecture.updatedAt}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
