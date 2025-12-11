'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useUserStore } from '@/store/userStore';
import { useRouter } from 'next/navigation';
import { AlertCircle } from 'lucide-react';

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const login = useUserStore((state) => state.login);
  const isLoading = useUserStore((state) => state.isLoading);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('이메일과 비밀번호를 모두 입력해주세요.');
      return;
    }
    try {
      await login(email, password);
      router.replace('/');
    } catch (error) {
      setError(error instanceof Error ? error.message : '로그인 실패');
    }
  };

  return (
    <div className="w-full max-w-md bg-zinc-900/40 border border-zinc-800 rounded-xl p-8 shadow-lg">
      <h1 className="text-center text-2xl font-semibold mb-2 text-white">
        로그인
      </h1>
      <p className="text-center text-sm  text-zinc-500 mb-6">
        이메일과 비밀번호를 입력하여 로그인하세요
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          type="text"
          placeholder="name@example.com"
          name="userEmail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-zinc-800 text-white placeholder:text-zinc-500 border border-zinc-800"
        />

        <Input
          type="password"
          placeholder="비밀번호"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-zinc-800 text-white placeholder:text-zinc-500 border border-zinc-800"
        />

        {error && (
          <div className="flex items-center gap-2 p-3 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-md animate-in fade-in slide-in-from-bottom-2">
            <AlertCircle size={16} className="shrink-0" />
            <p>{error}</p>
          </div>
        )}

        <Button
          type="submit"
          className="w-full bg-white text-black font-semibold hover:bg-gray-200 h-11"
          disabled={isLoading}
        >
          로그인
        </Button>
      </form>

      <div className="mt-8 text-center text-sm  text-zinc-500">
        계정이 없으신가요?{' '}
        <a href="/signup" className="text-indigo-500 font-semibold">
          회원가입
        </a>
        <div className="mt-3">
          <a href="/" className=" text-zinc-500 hover:text-white transition">
            홈으로 돌아가기
          </a>
        </div>
      </div>
    </div>
  );
}
