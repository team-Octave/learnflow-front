'use client';

import { useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useFormContext } from 'react-hook-form';
import { CurriculumFormValues } from '../../schemas';
import {
  completeVideoUploadAction,
  getVideoUploadUrlAction,
} from '../../actions';
import { toast } from 'sonner';
import { Loader2, Upload, CheckCircle, X, PlayCircle } from 'lucide-react';

interface VideoItemProps {
  lessonPath: string;
  hasExistingVideo?: boolean;
}

export default function VideoItem({
  lessonPath,
  hasExistingVideo = false,
}: VideoItemProps) {
  const { watch, setValue } = useFormContext<CurriculumFormValues>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [duration, setDuration] = useState<number>(0);
  // 기존 영상이 있을 때, 사용자가 변경을 원할 경우 true로 설정
  const [wantsToChange, setWantsToChange] = useState(false);

  // 기존 영상이 있고, 변경을 원하지 않으면 기존 영상 표시
  const showExistingVideo =
    hasExistingVideo && !wantsToChange && !previewUrl && !isUploaded;

  // 드래그 앤 드롭 핸들러
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file && file.type === 'video/mp4') {
      setSelectedFile(file);

      // duration 추출
      const video = document.createElement('video');
      video.preload = 'metadata';
      video.onloadedmetadata = () => {
        setDuration(Math.round(video.duration));
      };

      const objectUrl = URL.createObjectURL(file);
      video.src = objectUrl;
      setPreviewUrl(objectUrl);
    } else {
      toast.error('MP4 파일만 업로드 가능합니다.');
    }
  };

  const handleDropZoneClick = () => {
    fileInputRef.current?.click();
  };

  // 파일 선택 시 미리보기 생성
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'video/mp4') {
      setSelectedFile(file);

      // duration 추출
      const video = document.createElement('video');
      video.preload = 'metadata';
      video.onloadedmetadata = () => {
        setDuration(Math.round(video.duration));
      };

      const objectUrl = URL.createObjectURL(file);
      video.src = objectUrl;
      setPreviewUrl(objectUrl);
    } else if (file) {
      toast.error('MP4 파일만 업로드 가능합니다.');
    }
  };

  // 미리보기 취소
  const handleCancelPreview = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error('파일을 선택해주세요.');
      return;
    }

    setIsUploading(true);
    setProgress(0);

    try {
      // 1. Server Action으로 Signed URL 요청
      const state = await getVideoUploadUrlAction({
        filename: selectedFile.name,
      });

      if (!state.success || !state.data) {
        throw new Error(state.message || 'Signed URL 발급 실패');
      }

      const { uploadUrl, mediaId } = state.data;

      await new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const percent = Math.round((event.loaded / event.total) * 100);
            setProgress(percent);
          }
        };

        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve();
          } else {
            reject(new Error(`업로드 실패: ${xhr.status}`));
          }
        };

        xhr.onerror = () => reject(new Error('네트워크 오류'));

        xhr.open('PUT', uploadUrl);
        xhr.setRequestHeader('Content-Type', selectedFile.type);
        xhr.send(selectedFile);
      });

      // 2. 업로드 완료 - GCS public URL 구성 및 폼에 저장
      const state2 = await completeVideoUploadAction({
        mediaId,
        durationSec: duration,
      });

      if (!state2.success || !state2.data) {
        throw new Error(state2.message || '업로드 완료 실패');
      }

      // mediaId를 폼에 저장
      setValue(`${lessonPath}.mediaId` as any, mediaId);

      // previewUrl과 selectedFile은 유지하여 미리보기에 사용
      toast.success('비디오 업로드 완료');
      setIsUploaded(true);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : '업로드 실패');
      setProgress(0);
    } finally {
      setIsUploading(false);
    }
  };

  const handleChangeVideo = () => {
    setIsUploaded(false);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    setSelectedFile(null);
    setValue(`${lessonPath}.mediaId` as any, null);
  };

  return (
    <div className="space-y-3">
      <Label className="text-xs text-zinc-400">비디오 파일</Label>

      {/* 기존 영상이 있는 경우 (URL은 없지만 서버에 저장됨) */}
      {showExistingVideo ? (
        <div className="flex items-center gap-3 p-4 bg-zinc-800/50 rounded-lg border border-zinc-700">
          <PlayCircle className="h-8 w-8 text-indigo-500 shrink-0" />
          <div className="flex-1">
            <p className="text-sm text-zinc-300">기존 영상이 있습니다</p>
            <p className="text-xs text-zinc-500 mt-1">
              영상을 변경하려면 "변경" 버튼을 클릭하세요
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setWantsToChange(true)}
            className="cursor-pointer"
          >
            변경
          </Button>
        </div>
      ) : /* 업로드 완료된 비디오 */
      isUploaded && previewUrl ? (
        <div className="space-y-3">
          <div className="relative rounded-lg overflow-hidden bg-black aspect-video">
            <video
              src={previewUrl}
              controls
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex items-center gap-2 p-3 bg-zinc-800 rounded-md">
            <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
            <span className="text-sm text-zinc-300 truncate flex-1">
              {selectedFile?.name}
            </span>
            <Button
              className="cursor-pointer"
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleChangeVideo}
            >
              변경
            </Button>
          </div>
        </div>
      ) : previewUrl ? (
        /* 파일 선택됨 - 미리보기 + 업로드 버튼 */
        <div className="space-y-3">
          <div className="relative rounded-lg overflow-hidden bg-black aspect-video">
            <video
              src={previewUrl}
              controls
              className="w-full h-full object-contain"
            />
            {/* 취소 버튼 */}
            {!isUploading && (
              <Button
                type="button"
                variant="secondary"
                size="icon"
                className="absolute top-2 right-2 h-8 w-8 cursor-pointer"
                onClick={handleCancelPreview}
              >
                <X size={16} />
              </Button>
            )}
          </div>

          <div className="flex items-center gap-2 p-3 bg-zinc-800/50 rounded-md">
            <span className="text-sm text-zinc-400 truncate flex-1">
              {selectedFile?.name}
            </span>
            <span className="text-xs text-zinc-500">
              {((selectedFile?.size || 0) / 1024 / 1024).toFixed(1)} MB
            </span>
          </div>

          {isUploading && (
            <div className="space-y-2">
              <Progress value={progress} className="h-2" />
              <p className="text-xs text-zinc-400 text-center">{progress}%</p>
            </div>
          )}

          <Button
            type="button"
            onClick={handleUpload}
            disabled={isUploading}
            className="w-full cursor-pointer flex gap-0.5"
          >
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                업로드 중...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                업로드
              </>
            )}
          </Button>
        </div>
      ) : (
        /* 파일 선택 전 - 드래그 앤 드롭 영역 */
        <>
          <input
            ref={fileInputRef}
            type="file"
            accept="video/*"
            disabled={isUploading}
            onChange={handleFileChange}
            className="hidden"
          />
          <div
            onClick={handleDropZoneClick}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`aspect-video rounded-lg border-2 border-dashed flex flex-col items-center justify-center gap-3 cursor-pointer transition-colors ${
              isDragging
                ? 'border-indigo-500 bg-indigo-500/10'
                : 'border-zinc-700 bg-zinc-900 hover:border-zinc-500 hover:bg-zinc-800/50'
            }`}
          >
            <div className="p-4 rounded-full bg-zinc-800">
              <Upload className="h-8 w-8 text-zinc-400" />
            </div>
            <div className="text-center">
              <p className="text-sm text-zinc-300">
                클릭하거나 파일을 드래그하세요
              </p>
              <p className="text-xs text-zinc-500 mt-1">1GB 이하의 MP4 파일</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
