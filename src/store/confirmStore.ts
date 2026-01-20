// store/use-confirm-store.ts
import { create } from 'zustand';

interface ConfirmState {
  isOpen: boolean;
  title: string;
  description: string;
  resolve: (value: boolean) => void;
  confirm: (title: string, description?: string) => Promise<boolean>;
  close: () => void;
}

export const useConfirmStore = create<ConfirmState>((set) => ({
  isOpen: false,
  title: '',
  description: '',
  resolve: () => {},
  confirm: (title, description = '') => {
    set({ isOpen: true, title, description });
    return new Promise((resolve) => {
      set({ resolve });
    });
  },
  close: () => set({ isOpen: false }),
}));
