'use client';

import { useFormContext, useFieldArray } from 'react-hook-form';
import { CurriculumFormValues, Lesson } from '../../schemas';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PencilLine, PlayCircle, Trash2 } from 'lucide-react';
import { useRef, useTransition } from 'react';
import {
  createChapterAction,
  deleteChapterAction,
  updateChapterAction,
} from '../../actions';
import LessonItem from './LessonItem';
import { toast } from 'sonner';
import { useConfirm } from '@/hooks/useConfirm';

interface ChapterItemProps {
  lectureId: number;
  chapterIndex: number;
  removeChapter: () => void;
  registerOpenLesson: (lessonPath: string) => void;
  unregisterOpenLesson: (lessonPath: string) => void;
}

const INIT_VIDEO_LESSON: Lesson = {
  id: null,
  lessonTitle: '',
  lessonType: 'VIDEO',
  isFreePreview: false,
  mediaId: null,
  quizQuestions: null,
};

const INIT_QUIZ_LESSON: Lesson = {
  id: null,
  lessonTitle: '',
  lessonType: 'QUIZ',
  isFreePreview: false,
  mediaId: null,
  quizQuestions: [{ id: null, question: '', correct: true, questionOrder: 1 }],
};

export default function ChapterItem({
  lectureId,
  chapterIndex,
  removeChapter,
  registerOpenLesson,
  unregisterOpenLesson,
}: ChapterItemProps) {
  const confirm = useConfirm();
  const [isPending, startTransition] = useTransition();
  const chapterTitleRef = useRef('');
  const { register, control, watch, setValue } =
    useFormContext<CurriculumFormValues>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: `chapters.${chapterIndex}.lessons`,
  });

  // 현재 챕터 데이터 관찰
  const chapterId = watch(`chapters.${chapterIndex}.id`);
  const chapterTitle = watch(`chapters.${chapterIndex}.chapterTitle`);

  const handleBlur = () => {
    if (chapterTitleRef.current === chapterTitle) return;
    if (!chapterTitle?.trim()) {
      toast.error('챕터 제목을 입력해주세요.');
      return;
    }
    if (chapterId) {
      handleUpdateChapter();
    } else {
      handleCreateChapter();
    }
  };

  const handleCreateChapter = () => {
    startTransition(async () => {
      const state = await createChapterAction(lectureId, {
        chapterTitle,
      });
      // 챕터 아이디 설정(state.data.id)
      if (state.success) {
        setValue(`chapters.${chapterIndex}.id`, state.data.id);
      } else {
        toast.error(state.message || '챕터 생성 실패');
      }
    });
  };

  const handleUpdateChapter = () => {
    if (!chapterId) {
      toast.error('등록되지 않은 챕터입니다.');
      removeChapter();
      return;
    }

    startTransition(async () => {
      await updateChapterAction(lectureId, chapterId, {
        chapterTitle,
      });
    });
  };

  const handleDeleteChapter = async () => {
    const ok = await confirm(
      '챕터를 삭제하시겠습니까?',
      '하위 레슨도 삭제됩니다.',
    );
    if (!ok) {
      return;
    }
    if (!chapterId) {
      toast.error('등록되지 않은 챕터입니다.');
      removeChapter();
      return;
    }
    startTransition(async () => {
      const state = await deleteChapterAction(lectureId, chapterId);
      if (state.success) {
        toast.success('챕터가 삭제되었습니다.');
        removeChapter();
      }
    });
  };

  return (
    <div className="flex flex-col p-4 border border-zinc-700 rounded-lg gap-4 bg-zinc-950/50">
      {/* 챕터 헤더 */}
      <div className="flex items-center gap-3">
        <div className="font-semibold text-zinc-400 w-20">
          Chapter {chapterIndex + 1}
        </div>
        <Input
          placeholder="챕터 제목을 입력하세요"
          {...register(`chapters.${chapterIndex}.chapterTitle`, {
            required: true,
          })}
          className="flex-1"
          onBlur={handleBlur}
          disabled={isPending}
          onFocus={(e) => (chapterTitleRef.current = e.target.value)}
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={handleDeleteChapter}
          disabled={isPending}
          className="text-zinc-500 hover:text-red-500 cursor-pointer"
        >
          <Trash2 size={18} />
        </Button>
      </div>
      {/* 레슨 목록 */}
      {chapterId && (
        <div className="flex flex-col gap-3 pl-4 border-l-2 border-zinc-800 ml-2">
          {fields.map((field, lessonIdx) => (
            <LessonItem
              key={field.id}
              lectureId={lectureId}
              chapterId={chapterId}
              chapterIndex={chapterIndex}
              lessonIndex={lessonIdx}
              removeLesson={() => remove(lessonIdx)}
              registerOpenLesson={registerOpenLesson}
              unregisterOpenLesson={unregisterOpenLesson}
            />
          ))}
        </div>
      )}

      {/* 레슨 추가 버튼 그룹 */}
      <div className="flex gap-2 mt-2">
        {/* 3. 방어 로직: 챕터 ID가 없으면(서버 미등록) 레슨 추가 방지 */}
        {!chapterId ? (
          <p className="text-xs text-zinc-500 italic p-2">
            챕터 제목을 먼저 입력하여 저장하면 레슨을 추가할 수 있습니다.
          </p>
        ) : (
          <>
            <Button
              type="button"
              variant="outline"
              className="flex-1 border-dashed text-zinc-400 hover:text-indigo-400 hover:border-indigo-400 cursor-pointer"
              onClick={() => append(INIT_VIDEO_LESSON)}
            >
              <PlayCircle className="mr-2 h-4 w-4" /> 영상 레슨 추가
            </Button>
            <Button
              type="button"
              variant="outline"
              className="flex-1 border-dashed text-zinc-400 hover:text-teal-400 hover:border-teal-400 cursor-pointer"
              onClick={() => append(INIT_QUIZ_LESSON)}
            >
              <PencilLine className="mr-2 h-4 w-4" /> 퀴즈 레슨 추가
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
