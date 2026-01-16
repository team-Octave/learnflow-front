'use client';

import { useEffect, useMemo, useState, useTransition } from 'react';
import { useFormContext } from 'react-hook-form';
import { CurriculumFormValues, LessonSchema } from '../../schemas';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
  Edit,
  Trash2,
  PlayCircle,
  FileQuestion,
  ChevronUp,
  Loader2,
  SaveIcon,
} from 'lucide-react';
import {
  createLessonAction,
  deleteLessonAction,
  updateLessonAction,
} from '../../actions';
import { toast } from 'sonner';
import QuizItem from './QuizItem';
import VideoItem from './VideoItem';

interface LessonItemProps {
  lectureId: number;
  chapterId: number;
  chapterIndex: number;
  lessonIndex: number;
  removeLesson: () => void;
  registerOpenLesson: (lessonPath: string) => void;
  unregisterOpenLesson: (lessonPath: string) => void;
}

export default function LessonItem({
  lectureId,
  chapterId,
  chapterIndex,
  lessonIndex,
  removeLesson,
  registerOpenLesson,
  unregisterOpenLesson,
}: LessonItemProps) {
  const { register, watch, setValue } = useFormContext<CurriculumFormValues>();
  const [isOpen, setIsOpen] = useState(true);
  const [isPending, startTransition] = useTransition();

  const lessonPath = `chapters.${chapterIndex}.lessons.${lessonIndex}` as const;

  // isOpen 상태 변경 시 등록/해제
  useEffect(() => {
    if (isOpen) {
      registerOpenLesson(lessonPath);
    } else {
      unregisterOpenLesson(lessonPath);
    }
    // 컴포넌트 언마운트 시 해제
    return () => {
      unregisterOpenLesson(lessonPath);
    };
  }, [isOpen, lessonPath, registerOpenLesson, unregisterOpenLesson]);

  // 데이터 관찰
  const lessonId = watch(`${lessonPath}.id`);
  const lessonType = watch(`${lessonPath}.lessonType`);
  const lessonTitle = watch(`${lessonPath}.lessonTitle`);
  const currentLessonData = watch(lessonPath); // 전체 레슨 데이터 (수정용)

  const [lastSavedData, setLastSavedData] = useState(currentLessonData);

  const isDirty = useMemo(() => {
    return JSON.stringify(currentLessonData) !== JSON.stringify(lastSavedData);
  }, [currentLessonData, lastSavedData]);

  /// LessonItem.tsx 내부 저장 로직 수정
  const handleSaveLesson = async () => {
    const currentLessonData = watch(lessonPath);

    // 레슨 타입별 사전 검증
    if (currentLessonData.lessonType === 'VIDEO') {
      if (!currentLessonData.videoUrl) {
        toast.error('비디오를 업로드해주세요.');
        return;
      }
    } else if (currentLessonData.lessonType === 'QUIZ') {
      if (
        !currentLessonData.quizQuestions ||
        currentLessonData.quizQuestions.length === 0
      ) {
        toast.error('최소 1개 이상의 퀴즈 문제를 추가해주세요.');
        return;
      }
    }

    const validation = LessonSchema.safeParse(currentLessonData);

    if (!validation.success) {
      const firstError = validation.error.issues[0].message;
      toast.error(firstError);
      return;
    }

    if (!isDirty) {
      setIsOpen(false);
      return;
    }

    startTransition(async () => {
      const state = lessonId
        ? await updateLessonAction(
            lectureId,
            chapterId,
            lessonId,
            validation.data,
          )
        : await createLessonAction(lectureId, chapterId, validation.data);

      if (state.success) {
        setLastSavedData(validation.data);
        setValue(`${lessonPath}.id`, state.data.id);
        setIsOpen(false);
        toast.success('저장 성공');
      }
    });
  };

  const handleDeleteLesson = () => {
    if (!lessonId) {
      toast.error('존재하지 않는 레슨입니다.');
      removeLesson();
      return;
    }

    if (!confirm('레슨을 삭제하시겠습니까?')) return;

    startTransition(async () => {
      const state = await deleteLessonAction(lectureId, chapterId, lessonId);
      if (state.success) {
        removeLesson();
        toast.success('레슨이 삭제되었습니다.');
      } else {
        toast.error(state.message || '레슨 삭제 실패');
      }
    });
  };

  return (
    <div
      className={`border rounded-md bg-zinc-900 overflow-hidden transition-colors ${
        isPending ? 'border-indigo-500/50' : 'border-zinc-800'
      }`}
    >
      {/* 레슨 요약 헤더 */}
      <div className="flex items-center gap-3 p-3 bg-zinc-900 hover:bg-zinc-800/50 transition-colors">
        {isPending ? (
          <Loader2 className="animate-spin text-zinc-500 h-5 w-5" />
        ) : lessonType === 'VIDEO' ? (
          <PlayCircle className="text-indigo-500 h-5 w-5" />
        ) : (
          <FileQuestion className="text-teal-500 h-5 w-5" />
        )}

        <span className="flex-1 font-medium text-sm text-zinc-200">
          {lessonTitle || '제목 없는 레슨'}
        </span>

        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <ChevronUp size={16} /> : <Edit size={16} />}
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-zinc-500 hover:text-red-400"
            onClick={handleDeleteLesson}
            disabled={isPending}
          >
            <Trash2 size={16} />
          </Button>
        </div>
      </div>

      {/* 상세 수정 영역 */}
      {isOpen && (
        <div className="p-4 bg-zinc-900/50 border-t border-zinc-800 space-y-4">
          <div className="space-y-3">
            <div>
              <Label className="text-xs text-zinc-400">레슨 제목</Label>
              <Input
                {...register(`${lessonPath}.lessonTitle`, { required: true })}
                placeholder="레슨 제목 입력"
                className="mt-1"
              />
            </div>
          </div>

          <Separator className="bg-zinc-800" />

          {/* VIDEO 타입 */}
          {lessonType === 'VIDEO' && <VideoItem lessonPath={lessonPath} />}

          {/* QUIZ 타입 */}
          {lessonType === 'QUIZ' && <QuizItem lessonPath={lessonPath} />}

          <div className="flex justify-end pt-2">
            <Button size="sm" onClick={handleSaveLesson}>
              <SaveIcon />
              저장
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
