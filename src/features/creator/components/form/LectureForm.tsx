'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldError,
  FieldSet,
} from '@/components/ui/field';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ImageUploadField } from './ImageUploadField';
import { useEffect, useState, useTransition } from 'react';
import { BasicInfo, CreatorLecture } from '../../types';
import { Category, Lecture, Level } from '@/features/lectures/types';
import { useRouter } from 'next/navigation';
import { convertURLtoFile } from '@/shared/utils';
import { createBasicLectureAction } from '../../actions';

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
        file: null,
      });
    }
  }, [lecture]);

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
      !basicInfo.description
    ) {
      alert('모든 정보를 입력해 주세요.');
      return;
    }
    if (basicInfo.title.length >= 100) {
      alert('제목은 최대 100자까지 입력 가능합니다.');
    }
    startTransition(async () => {
      const formData = new FormData();

      formData.append('title', basicInfo.title);
      formData.append('categoryId', basicInfo.categoryId);
      formData.append('level', basicInfo.level);
      formData.append('description', basicInfo.description);

      // 2. 파일 처리 로직 (핵심 변경 사항)
      if (basicInfo.file) {
        // CASE A: 사용자가 새 이미지를 직접 업로드한 경우 -> 그 파일 전송
        formData.append('file', basicInfo.file);
      } else if (!lecture) {
        // CASE B: [초기 등록]인데 사용자가 파일을 안 올린 경우 -> '기본 이미지' 전송
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
      // CASE C: [수정 모드]인데 파일을 안 올린 경우 (basicInfo.file === null)
      // -> 아무것도 보내지 않음 (서버는 기존 이미지 유지)

      const state = await createBasicLectureAction(formData);

      if (state.success) {
        const lecture = state.data!;
        router.replace(`/creator/${lecture.id}?step=2`);
      } else {
        alert(state.message || '강의 저장에 실패하였습니다.');
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
                <div className="grid grid-cols-2 gap-4">
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
