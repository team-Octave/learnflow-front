// 임시 생성(사용x)
import { useUserStore } from '@/store/userStore';

export const useUser = () => {
  const confirm = useUserStore((state) => state.user);
  return confirm;
};
