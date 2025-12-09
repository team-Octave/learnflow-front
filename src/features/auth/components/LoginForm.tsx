'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { loginAction } from '../actions'; // ★ 반드시 추가
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('이메일과 비밀번호를 모두 입력해주세요.');
      return;
    }

    // const res = await loginAction(email, password);

    // // 공통 실패 처리
    // if (!res || res.success === false) {
    //   setError(res?.message || '로그인에 실패했습니다.');
    //   return;
    // }

    // // 성공했을 때 data 안의 토큰 꺼내기
    // const { accessToken, refreshToken, nickname, role } = res.data;

    // // 쿠키 저장
    // document.cookie = `accessToken=${accessToken}; path=/;`;
    // document.cookie = `refreshToken=${refreshToken}; path=/;`;

    // console.log('로그인 성공:', nickname, role);

    router.push('/');
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-zinc-800 text-white placeholder:text-zinc-500 border border-zinc-800"
        />

        <Input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-zinc-800 text-white placeholder:text-zinc-500 border border-zinc-800"
        />

        {error && <p className="text-red-400] text-sm mt-2">{error}</p>}

        <Button
          type="submit"
          className="w-full bg-white text-black font-semibold hover:bg-gray-200 h-11"
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
