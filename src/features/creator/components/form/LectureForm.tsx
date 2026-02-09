'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Field, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ImageUploadField } from './ImageUploadField';
import { useEffect, useMemo, useState, useTransition } from 'react';
import { BasicInfo } from '../../types';
import { Category, Lecture, Level, Payment } from '@/features/lectures/types';
import { useRouter } from 'next/navigation';
import { convertURLtoFile } from '@/shared/utils';
import {
  createBasicLectureAction,
  updateBasicLectureAction,
} from '../../actions';
import { toast } from 'sonner';

interface LectureFormProps {
  lecture?: Lecture;
}

export default function LectureForm({ lecture }: LectureFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [basicInfo, setBasicInfo] = useState<BasicInfo>({
    title: '',
    categoryId: '',
    level: '',
    description: '',
    paymentType: 'FREE',
    file: null,
  });

  // 수정 시 초기 값 로드
  useEffect(() => {
    if (lecture) {
      setBasicInfo({
        title: lecture.title,
        categoryId: lecture.categoryId.toString() as Category,
        level: lecture.level,
        description: lecture.description,
        paymentType: lecture.paymentType,
        file: null,
      });
    }
  }, [lecture]);

  const hasChanges = useMemo(() => {
    if (!lecture) return true;

    const titleChanged = basicInfo.title !== lecture.title;
    const categoryChanged =
      basicInfo.categoryId !== lecture.categoryId.toString();
    const levelChanged = basicInfo.level !== lecture.level;
    const descriptionChanged = basicInfo.description !== lecture.description;
    const fileChanged = basicInfo.file !== null;

    return (
      titleChanged ||
      categoryChanged ||
      levelChanged ||
      descriptionChanged ||
      fileChanged
    );
  }, [lecture, basicInfo]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setBasicInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSumbit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !basicInfo.title ||
      !basicInfo.categoryId ||
      !basicInfo.level ||
      !basicInfo.description ||
      !basicInfo.paymentType
    ) {
      toast.error('모든 정보를 입력해 주세요.');
      return;
    }
    if (basicInfo.title.length >= 100) {
      toast.error('제목은 최대 100자까지 입력 가능합니다.');
      return;
    }

    // 수정 모드에서 변경 사항이 없으면 API 호출 없이 다음 페이지로 이동
    if (lecture && !hasChanges) {
      router.replace(`/creator/${lecture.id}?step=2`);
      return;
    }

    startTransition(async () => {
      const formData = new FormData();

      formData.append('title', basicInfo.title);
      formData.append('categoryId', basicInfo.categoryId);
      formData.append('level', basicInfo.level);
      formData.append('description', basicInfo.description);
      formData.append('paymentType', basicInfo.paymentType);

      if (basicInfo.file) {
        // 사용자가 새 이미지를 직접 업로드한 경우 -> 그 파일 전송
        formData.append('file', basicInfo.file);
      } else if (!lecture) {
        // 초기 등록인데 사용자가 파일을 안 올린 경우 -> 기본 이미지 전송
        try {
          const defaultPath = '/images/defaultImage.jpg';
          const defaultFile = await convertURLtoFile(
            defaultPath,
            'default_thumbnail.jpg',
          );
          formData.append('file', defaultFile);
        } catch (error) {
          console.error('기본 이미지 변환 실패:', error);
        }
      }

      // 수정 모드인 경우 updateBasicLectureAction 호출
      const state = lecture
        ? await updateBasicLectureAction(lecture.id, formData)
        : await createBasicLectureAction(formData);

      if (state.success) {
        const lectureData = state.data!;
        router.replace(`/creator/${lectureData.id}?step=2`);
      } else {
        toast.error(state.message || '강의 저장에 실패하였습니다.');
      }
    });
  };

  const defaultThumbnail = '/images/defaultImage.jpg';
  const currentThumbnailUrl = lecture?.thumbnailUrl || defaultThumbnail;

  return (
    <form
      onSubmit={handleSumbit}
      className="grid grid-cols-3 gap-8"
      id="basic-form"
    >
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle className="text-xl font-bold">강의 정보</CardTitle>
          <CardDescription>강의의 기본 정보를 입력해 주세요.</CardDescription>
        </CardHeader>
        <CardContent>
          <FieldSet>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="title">강의 제목</FieldLabel>
                <Input
                  id="title"
                  name="title"
                  autoComplete="off"
                  placeholder="강의 제목을 입력해주세요.(최대 100자)"
                  value={basicInfo.title}
                  onChange={handleChange}
                />
              </Field>
              <Field>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <FieldLabel>카테고리</FieldLabel>
                    <Select
                      key={basicInfo.categoryId}
                      value={basicInfo.categoryId}
                      onValueChange={(value: Category) => {
                        setBasicInfo((prev) => ({
                          ...prev,
                          categoryId: value,
                        }));
                      }}
                    >
                      <SelectTrigger className="w-full mt-3">
                        <SelectValue placeholder="카테고리 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Frontend</SelectItem>
                        <SelectItem value="2">Backend</SelectItem>
                        <SelectItem value="3">AI</SelectItem>
                        <SelectItem value="4">Game</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <FieldLabel>난이도</FieldLabel>
                    <Select
                      key={basicInfo.level}
                      value={basicInfo.level}
                      onValueChange={(value: Level) => {
                        setBasicInfo((prev) => ({ ...prev, level: value }));
                      }}
                    >
                      <SelectTrigger className="w-full mt-3">
                        <SelectValue placeholder="난이도 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="BEGINNER">입문</SelectItem>
                        <SelectItem value="INTERMEDIATE">중급</SelectItem>
                        <SelectItem value="ADVANCED">고급</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <FieldLabel>강의 유형</FieldLabel>

                    <Select
                      key={basicInfo.paymentType}
                      value={basicInfo.paymentType}
                      onValueChange={(value: Payment) => {
                        setBasicInfo((prev) => ({
                          ...prev,
                          paymentType: value,
                        }));
                      }}
                    >
                      <SelectTrigger className="w-full mt-3">
                        <SelectValue placeholder="강의 유형 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="FREE">무료</SelectItem>
                        <SelectItem value="PAID">유료</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </Field>
              <Field>
                <FieldLabel htmlFor="description">강의 설명</FieldLabel>
                <Textarea
                  id="description"
                  name="description"
                  autoComplete="off"
                  placeholder="강의 설명을 입력해주세요."
                  value={basicInfo.description}
                  onChange={handleChange}
                />
              </Field>
            </FieldGroup>
          </FieldSet>
        </CardContent>
      </Card>
      <div>
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold">썸네일</CardTitle>
          </CardHeader>
          <CardContent>
            <ImageUploadField
              value={basicInfo.file}
              onChange={(file) =>
                setBasicInfo((prev) => ({ ...prev, file: file }))
              }
              initialImage={currentThumbnailUrl}
            />
          </CardContent>
        </Card>
      </div>
    </form>
  );
}
