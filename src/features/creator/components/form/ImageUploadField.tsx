'use client';

import { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ImagePlus, PenLine, X } from 'lucide-react';
import Image from 'next/image';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface ImageUploadProps {
  label?: string;
  value: File | null; // 부모가 관리하는 파일 상태
  onChange: (file: File | null) => void; // 상태 변경 함수
  defaultImage: string; // 기본 이미지 URL
}

export function ImageUploadField({
  value,
  onChange,
  defaultImage,
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // value(부모 상태)가 null로 변하면 미리보기(preview)도 초기화
  useEffect(() => {
    if (value) {
      // 파일이 있으면 프리뷰 생성
      const objectUrl = URL.createObjectURL(value);
      setPreview(objectUrl);

      // 메모리 정리 (cleanup)
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      // 파일이 없으면 프리뷰 제거
      setPreview(null);
      if (inputRef.current) inputRef.current.value = '';
    }
  }, [value]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('이미지 파일만 업로드 가능합니다.');
        return;
      }

      // 미리보기 URL 생성
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);

      // 부모 상태 업데이트
      onChange(file);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    onChange(null);
  };

  const currentImageSrc = preview || defaultImage;

  return (
    <div className="space-y-2">
      <div>
        {/* 이미지가 있거나(기본 or 업로드), 프리뷰가 있는 경우 */}
        <AspectRatio ratio={16 / 9}>
          <div className="relative w-full h-full rounded-md overflow-hidden border group">
            {/* 이미지 영역 전체를 label로 감싸서, 
              이미지를 클릭해도 파일 업로드창이 뜨도록 함 
            */}
            <label
              htmlFor="image-upload"
              className="block w-full h-full cursor-pointer relative"
            >
              <Image
                src={currentImageSrc!}
                alt="Thumbnail"
                fill
                className="object-fill transition-opacity group-hover:opacity-90 "
              />

              {/* 호버 시 '변경' 아이콘 표시 (UX 강화) */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex flex-col items-center text-white">
                  <PenLine className="h-8 w-8 mb-2" />
                  <span className="text-sm font-medium">이미지 변경</span>
                </div>
              </div>
            </label>

            {/* X 버튼: 사용자가 '직접 업로드한 파일'이 있을 때만 표시.
              누르면 업로드 취소 -> 기본 이미지로 복귀 
            */}
            {value && (
              <button
                type="button"
                onClick={handleRemove}
                className="absolute top-2 right-2 z-10 bg-rose-500 text-white p-1.5 rounded-full shadow-md hover:bg-rose-600 transition transform hover:scale-105"
                title="업로드 취소 (기본 이미지로 복귀)"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </AspectRatio>

        <Input
          id="image-upload"
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
}
