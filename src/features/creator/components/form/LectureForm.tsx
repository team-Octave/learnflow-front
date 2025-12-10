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
import { useState } from 'react';
import { CreatorLecture } from '../../types';

interface LectureFormProps {
  lecture?: CreatorLecture;
}

export default function LectureForm({ lecture }: LectureFormProps) {
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  return (
    <form action="" className="grid grid-cols-3 gap-8">
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle className="text-xl font-bold">강의 정보</CardTitle>
          <CardDescription>강의의 기본 정보를 입력해 주세요.</CardDescription>
        </CardHeader>
        <CardContent>
          <FieldSet>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">강의 제목</FieldLabel>
                <Input
                  id="lectureTitle"
                  autoComplete="off"
                  placeholder="예: Next.js 15 완벽 가이드"
                  value={lecture?.lectureTitle || ''}
                  onChange={() => {
                    // TODO: 강의 제목 변경 로직 작성
                  }}
                />
              </Field>
              <Field>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <FieldLabel>카테고리</FieldLabel>
                    <Select
                      value={lecture?.category}
                      onValueChange={() => {
                        // TODO: 카테고리 선택 로직 작성
                      }}
                    >
                      <SelectTrigger className="w-full mt-3">
                        <SelectValue placeholder="카테고리 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="FRONTEND">Frontend</SelectItem>
                        <SelectItem value="BACKEND">Backend</SelectItem>
                        <SelectItem value="AI">AI</SelectItem>
                        <SelectItem value="GAME">Game</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <FieldLabel>난이도</FieldLabel>
                    <Select
                      onValueChange={() => {
                        // TODO: 난이도 선택 로직 작성
                      }}
                      value={lecture?.level}
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
                <FieldLabel htmlFor="name">강의 설명</FieldLabel>
                <Textarea
                  name="lectureTitle"
                  autoComplete="off"
                  placeholder="예: Next.js 15 완벽 가이드"
                  value={lecture?.lectureDesctiption}
                  onChange={() => {
                    // TODO: 강의 설명 로직 작성
                  }}
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
              value={thumbnail}
              onChange={(file) => setThumbnail(file)}
              // TODO: 썸네일 변경 로직 작성
              defaultImage="/images/defaultImage.jpg"
            />
          </CardContent>
        </Card>
      </div>
    </form>
  );
}
