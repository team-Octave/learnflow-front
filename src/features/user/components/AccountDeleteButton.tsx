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
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [inputEmail, setInputEmail] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isEqual, setIsEqual] = useState<boolean>(false);

  const handleDelete = () => {
    if (inputEmail !== email) {
      setError('이메일이 일치하지 않습니다.');
      return;
    }

    console.log('회원 탈퇴 진행 (지금은 mock)');
  };

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const changedEmail = e.target.value;
    setInputEmail(changedEmail);
    if (changedEmail === email) {
      setIsEqual(true);
    } else {
      setIsEqual(false);
    }
  };

  const handleClose = () => {
    setInputEmail('');
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(next: boolean) => {
        if (!next) handleClose(); // 닫힐 때 실행
        setIsOpen(next);
      }}
    >
      {/* 버튼 (휴지통 + 텍스트) */}
      <DialogTrigger asChild>
        <Button className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2 cursor-pointer">
          <Trash2 size={16} />
          회원 탈퇴
        </Button>
      </DialogTrigger>

      {/* 모달 */}
      <DialogContent className="sm:max-w-[520px] bg-zinc-900 border border-zinc-700 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            정말 탈퇴하시겠습니까?
          </DialogTitle>

          <DialogDescription className="text-zinc-400 leading-relaxed text-pretty">
            <div>
              회원 탈퇴 시 모든 데이터가 영구적으로 삭제되며, 이 작업은 되돌릴
              수 없습니다.
            </div>
            <div>
              계속하시려면 아래 입력창에 이메일 주소{' '}
              <span className="font-semibold text-white">{email}</span> 을
              입력하세요.
            </div>
          </DialogDescription>
        </DialogHeader>

        <div>
          {/* 이메일 입력 */}
          <Input
            placeholder={email}
            value={inputEmail}
            onChange={(e) => {
              handleChangeEmail(e);
              setError('');
            }}
            className="bg-transparent border-zinc-600 text-white"
          />

          {/* 에러 텍스트 */}
          {error && <p className="text-red-500 text-sm px-2 mt-2">{error}</p>}
        </div>

        <DialogFooter className="mt-6">
          <DialogClose asChild>
            <Button variant="outline">취소</Button>
          </DialogClose>

          {/* 탈퇴 실행 버튼 */}
          <Button
            className="bg-red-600 hover:bg-red-700 text-white cursor-pointer"
            onClick={handleDelete}
            disabled={!isEqual}
          >
            탈퇴하기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
