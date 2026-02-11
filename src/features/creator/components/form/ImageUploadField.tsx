'use client';

import { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { PenLine, X } from 'lucide-react';
import Image from 'next/image';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { toast } from 'sonner';

interface ImageUploadProps {
  value: File | null;
  onChange: (file: File | null) => void;
  initialImage: string;
}

export function ImageUploadField({
  value,
  onChange,
  initialImage,
}: ImageUploadProps) {
  const [newFilePreview, setNewFilePreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (value) {
      const objectUrl = URL.createObjectURL(value);
      setNewFilePreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setNewFilePreview(null);
      if (inputRef.current) inputRef.current.value = '';
    }
  }, [value]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/jpeg')) {
        toast.error('JPG/JPEG 파일만 업로드 가능합니다.');
        return;
      }
      onChange(file);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onChange(null);
  };

  const displaySrc = newFilePreview || initialImage;
  const isObjectUrl =
    typeof displaySrc === 'string' && displaySrc.startsWith('blob:');

  return (
    <div className="space-y-2">
      <AspectRatio ratio={16 / 9}>
        <div className="relative w-full h-full rounded-md overflow-hidden border group">
          <label
            htmlFor="image-upload"
            className="block w-full h-full cursor-pointer relative"
          >
            {isObjectUrl ? (
              //  로컬 미리보기(blob:)는 next/image보다 <img>가 안전
              <img
                src={displaySrc}
                alt="Thumbnail"
                className="w-full h-full object-cover transition-opacity group-hover:opacity-90"
              />
            ) : (
              // 서버/정적 이미지 URL은 next/image로 최적화
              <Image
                src={displaySrc || '/images/placeholder.jpg'}
                alt="Thumbnail"
                fill
                className="object-cover transition-opacity group-hover:opacity-90"
                sizes="256px"
              />
            )}

            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="flex flex-col items-center text-white">
                <PenLine className="h-8 w-8 mb-2" />
                <span className="text-sm font-medium">이미지 변경</span>
              </div>
            </div>
          </label>

          {value && (
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-2 right-2 z-10 bg-rose-500 text-white p-1.5 rounded-full shadow-md hover:bg-rose-600 transition transform hover:scale-105"
              title="변경 취소 (기본 이미지로)"
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
  );
}
