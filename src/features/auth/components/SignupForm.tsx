'use client';

import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Check, X } from 'lucide-react';
import { signupAction, checkNicknameAction } from '../actions';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function SignupForm() {
  const router = useRouter();

  // 입력값
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');

  // 상태
  const [emailError, setEmailError] = useState('');
  const [nicknameError, setNicknameError] = useState('');
  const [nicknameOk, setNicknameOk] = useState<boolean | null>(null);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [passwordCheckError, setPasswordCheckError] = useState<string>('');

  // 정규식
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const hasTwoTypes =
    /(?=.*[A-Za-z])(?=.*\d)|(?=.*[A-Za-z])(?=.*[!@#$%])|(?=.*\d)(?=.*[!@#$%])/.test(
      password,
    );
  const lengthValid = password.length >= 8 && password.length <= 32;

  // 이메일 검사
  const validateEmail = (changedEmail: string) => {
    if (!emailRegex.test(changedEmail)) {
      setEmailError('이메일 형식이 올바르지 않습니다.');
    } else {
      setEmailError('');
    }
  };

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const changedEmail = e.target.value;
    setEmail(changedEmail);
    validateEmail(changedEmail);
  };

  // 비밀번호 검사
  const validatePassword = () => {
    if (!hasTwoTypes || !lengthValid) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const changedPassword = e.target.value;
    setPassword(changedPassword);
    validatePassword();
    validatePasswordCheck(passwordCheck, changedPassword);
  };

  // 비밀번호 확인
  const validatePasswordCheck = (
    changedPasswordCheck: string,
    changedPassword?: string,
  ) => {
    const comparePassword = changedPassword || password;
    if (comparePassword !== changedPasswordCheck) {
      setPasswordCheckError('비밀번호가 일치하지 않습니다.');
    } else {
      setPasswordCheckError('');
    }
  };

  const handleChangePasswordCheck = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const changedPasswordCheck = e.target.value;
    setPasswordCheck(changedPasswordCheck);
    validatePasswordCheck(changedPasswordCheck);
  };

  // 닉네임 중복 확인
  const handleCheckNickname = async () => {
    setNicknameError('');
    setNicknameOk(null);

    if (!nickname.trim()) {
      setNicknameError('닉네임을 입력해주세요.');
      return;
    }

    // const res = await checkNicknameAction(nickname);

    // if (!res.success) {
    //   setNicknameError(res.message);
    //   return;
    // }

    // if (res.data === true) {
    //   // true = 중복됨
    //   setNicknameError('중복된 닉네임입니다.');
    //   setNicknameOk(false);
    // } else {
    //   setNicknameOk(true);
    // }
  };

  // 제출
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    validateEmail(email);
    validatePassword();
    validatePasswordCheck(passwordCheck);

    if (emailError || passwordError || passwordCheckError || nicknameError)
      return;

    // const res = await signupAction({
    //   email,
    //   password,
    //   nickname,
    // });

    // if (!res.success) {
    //   setEmailError(res.message);
    //   return;
    // }

    router.push('/login');
  };

  return (
    <div className="w-full max-w-md bg-zinc-900/40 border border-zinc-800 rounded-xl p-8 shadow-lg">
      <h1 className="text-center text-2xl font-semibold mb-2 text-white">
        회원가입
      </h1>
      <p className="text-center text-sm text-zinc-500 mb-6">
        새로운 계정을 생성하고 학습을 시작하세요
      </p>

      <form onSubmit={handleSignup} className="space-y-6">
        {/* 이메일 */}
        <div className="space-y-2">
          <Label className="text-white">이메일</Label>
          <Input
            type="text"
            placeholder="name@example.com"
            value={email}
            onChange={handleChangeEmail}
            className={cn(
              `bg-zinc-800 text-white placeholder:text-zinc-500 border border-zinc-800`,
              email && emailError && 'border-red-400 ',
            )}
          />
          {email && emailError && (
            <p className="text-red-400 text-sm">{emailError}</p>
          )}
        </div>

        {/* 비밀번호 */}
        <div className="space-y-2">
          <Label className="text-white">비밀번호</Label>

          <Input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={handleChangePassword}
            className={`bg-zinc-800 text-white placeholder:text-zinc-500 border border-zinc-800
              ${
                password && passwordError ? 'border-red-400' : 'border-zinc-800'
              }`}
          />

          <div className="ml-1 space-y-1">
            <p
              className={cn(
                `text-sm flex items-center gap-1 text-zinc-500`,
                password && (hasTwoTypes ? 'text-indigo-500' : 'text-red-400'),
              )}
            >
              {password && !hasTwoTypes ? <X size={16} /> : <Check size={16} />}{' '}
              영문/숫자/특수문자 중 2가지 이상 포함
            </p>
            <p
              className={cn(
                `text-sm flex items-center gap-1 text-zinc-500`,
                password && (lengthValid ? 'text-indigo-500' : 'text-red-400'),
              )}
            >
              {password && !lengthValid ? <X size={16} /> : <Check size={16} />}{' '}
              8자 이상 32자 이하 입력 (공백 제외)
            </p>
          </div>

          {passwordError && (
            <p className="text-red-400 text-sm">{passwordError}</p>
          )}
        </div>

        {/* 비밀번호 확인 */}
        <div className="space-y-2">
          <Label className="text-white">비밀번호 확인</Label>

          <Input
            type="password"
            placeholder="비밀번호 확인"
            value={passwordCheck}
            onChange={(e) => setPasswordCheck(e.target.value)}
            className={`bg-zinc-800 text-white placeholder:text-zinc-500 border border-zinc-800 ${
              password && passwordCheckError
                ? 'border-red-400'
                : 'border-zinc-800'
            }`}
          />

          {password && passwordCheckError && (
            <p className="text-red-400 text-sm">{passwordCheckError}</p>
          )}
        </div>

        {/* 닉네임 */}
        <div className="space-y-2">
          <Label className="text-white">닉네임</Label>

          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="닉네임"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className={`bg-zinc-800 text-white placeholder:text-zinc-500 border border-zinc-800 ${
                nicknameError ? 'border-red-400' : 'border-zinc-800'
              }`}
            />
            <Button
              type="button"
              onClick={handleCheckNickname}
              className="bg-zinc-900 border-zinc-800 cursor-pointer text-white hover:bg-zinc-800"
            >
              중복 확인
            </Button>
          </div>

          {nicknameError && (
            <p className="text-red-400 text-sm">{nicknameError}</p>
          )}
          {nicknameOk && (
            <p className="text- text-sm">사용 가능한 닉네임입니다.</p>
          )}
        </div>

        {/* 제출 버튼 */}
        <Button
          type="submit"
          className="w-full bg-white text-black font-semibold hover:bg-gray-200"
        >
          계정 생성하기
        </Button>
      </form>

      <div className="mt-6 text-center text-sm text-zinc-500">
        이미 계정이 있으신가요?{' '}
        <Link href="/login" className="text-indigo-500 font-semibold">
          로그인
        </Link>
      </div>
    </div>
  );
}
