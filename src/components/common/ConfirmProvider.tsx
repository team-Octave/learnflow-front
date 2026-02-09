// components/confirm-provider.tsx
'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useConfirmStore } from '@/store/confirmStore';

export const ConfirmProvider = () => {
  const isOpen = useConfirmStore((state) => state.isOpen);
  const title = useConfirmStore((state) => state.title);
  const description = useConfirmStore((state) => state.description);
  const resolve = useConfirmStore((state) => state.resolve);
  const close = useConfirmStore((state) => state.close);

  const handleAction = (value: boolean) => {
    close();
    resolve(value);
  };

  return (
    <AlertDialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          handleAction(false);
        }
      }}
    >
      <AlertDialogContent
        onCloseAutoFocus={(e) => {
          e.preventDefault();
        }}
      >
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription className={!description ? 'sr-only' : ''}>
            {description || title}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => handleAction(false)}>
            취소
          </AlertDialogCancel>
          <AlertDialogAction onClick={() => handleAction(true)}>
            확인
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
