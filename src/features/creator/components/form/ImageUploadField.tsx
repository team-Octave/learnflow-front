'use client';

import { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ImagePlus, PenLine, X } from 'lucide-react';
import Image from 'next/image';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { toast } from 'sonner';

interface ImageUploadProps {
  value: File | null; // 새로 업로드하려는 파일 객체 (부모 상태)
  onChange: (file: File | null) => void;
  initialImage: string; // 초기 이미지 URL (기본 이미지 OR 서버 저장 이미지)
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

      // cleanup: 이전 미리보기 URL 메모리 해제
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      // 파일이 없으면(초기화 or 취소) 미리보기 제거 -> initialImage가 보이게 됨
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
      onChange(file); // 부모에게 File 객체 전달
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation(); // 라벨 클릭 이벤트 전파 방지
    onChange(null); // 파일 상태 초기화 (-> 다시 initialImage가 보임)
  };

  // 새 파일이 있으면 그 파일의 미리보기를, 없으면 초기(서버/기본) 이미지를 보여줌
  const displaySrc = newFilePreview || initialImage;

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
              {displaySrc ? (
                <img
                  src={displaySrc}
                  alt="Thumbnail"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  loading="eager"
                  className="object-cover transition-opacity group-hover:opacity-90"
                />
              ) : (
                // 만약 initialImage조차 없을 때를 대비한 Fallback (선택사항)
                <div className="flex items-center justify-center w-full h-full text-gray-400">
                  <ImagePlus size={40} />
                </div>
              )}

              {/* 호버 시 '변경' 아이콘 표시 (UX 강화) */}
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
    </div>
  );
}
