// src/app/login/page.tsx  ← 서버 컴포넌트
import LoginForm from '@/features/auth/components/LoginForm';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <LoginForm />
    </div>
  );
}
