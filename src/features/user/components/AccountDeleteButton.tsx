'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Trash2 } from 'lucide-react';

interface AccountDeleteButtonProps {
  email: string;
}

export default function AccountDeleteButton({
  email,
}: AccountDeleteButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputEmail, setInputEmail] = useState('');
  const [error, setError] = useState('');

  const normalizedInput = inputEmail.trim().toLowerCase();
  const normalizedEmail = (email ?? '').trim().toLowerCase();
  const isEqual = normalizedInput === normalizedEmail;

  const handleClose = () => {
    setInputEmail('');
    setError('');
  };

  const handleDelete = () => {
    if (!isEqual) {
      setError('이메일이 일치하지 않습니다.');
      return;
    }

    // ✅ 지금은 mock
    console.log('회원 탈퇴 진행 (지금은 mock)');

    // ✅ 사용자에게 "처리됐다"는 UI 변화 제공
    setIsOpen(false);
    handleClose();
    // 원하면 alert도 가능:
    // alert('탈퇴 요청이 처리되었습니다. (mock)');
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(next) => {
        if (!next) handleClose();
        setIsOpen(next);
      }}
    >
      <DialogTrigger asChild>
        <Button className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2 cursor-pointer">
          <Trash2 size={16} />
          회원 탈퇴
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[520px] bg-zinc-900 border border-zinc-700 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            정말 탈퇴하시겠습니까?
          </DialogTitle>

          {/* ✅ div 제거 (hydration 에러 해결) */}
          <DialogDescription className="text-zinc-400 leading-relaxed text-pretty">
            회원 탈퇴 시 모든 데이터가 영구적으로 삭제되며, 이 작업은 되돌릴 수
            없습니다.
            <br />
            계속하시려면 아래 입력창에 이메일 주소{' '}
            <span className="font-semibold text-white">{email}</span> 을
            입력하세요.
          </DialogDescription>
        </DialogHeader>

        <div>
          <Input
            placeholder={email}
            value={inputEmail}
            onChange={(e) => {
              setInputEmail(e.target.value);
              setError('');
            }}
            className="bg-transparent border-zinc-600 text-white"
          />

          {error && <p className="text-red-500 text-sm px-2 mt-2">{error}</p>}
        </div>

        <DialogFooter className="mt-6">
          <DialogClose asChild>
            <Button variant="outline">취소</Button>
          </DialogClose>

          {/* <Button
            className="bg-red-600 hover:bg-red-700 text-white cursor-pointer"
            onClick={handleDelete}
            disabled={!isEqual}
          >
            탈퇴하기
          </Button> */}
          <Button
            className="bg-red-600 hover:bg-red-700 text-white cursor-pointer"
            disabled={!isEqual}
          >
            탈퇴하기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
