'use client';

import { useState, useTransition } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { signupAction, checkNicknameAction } from '@/features/user/actions';
import Link from 'next/link';
import { Check, X, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function SignupForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // 입력값
  const [email, setEmail] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordCheck, setPasswordCheck] = useState<string>('');

  // 상태
  const [emailError, setEmailError] = useState<string>('');
  const [nicknameError, setNicknameError] = useState<string>('');
  const [nicknameOk, setNicknameOk] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [passwordCheckError, setPasswordCheckError] = useState<string>('');
  const [serverError, setServerError] = useState<string>('');

  // 정규식
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const hasTwoTypes =
    /(?=.*[A-Za-z])(?=.*\d)|(?=.*[A-Za-z])(?=.*[!@#$%])|(?=.*\d)(?=.*[!@#$%])/;
  const lengthValid = (password: string) => {
    return password.length >= 8 && password.length <= 32;
  };

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
  const validatePassword = (password: string) => {
    if (!hasTwoTypes.test(password) || !lengthValid(password)) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const changedPassword = e.target.value;
    setPassword(changedPassword);
    validatePassword(changedPassword);
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
    setNicknameOk(false);

    if (!nickname.trim()) {
      setNicknameError('닉네임을 입력해주세요.');
      return;
    }

    startTransition(async () => {
      try {
        const result = await checkNicknameAction(nickname);

        if (result.success) {
          setNicknameOk(true);
        } else {
          setNicknameError(result.error || '이미 사용 중인 닉네임입니다.');
          setNicknameOk(false);
        }
      } catch (error) {
        setNicknameError(
          '중복 확인 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
        );
      }
    });
  };

  // 제출
  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setServerError('');

    validateEmail(email);
    validatePassword(password);
    validatePasswordCheck(passwordCheck);

    if (
      !emailRegex.test(email) ||
      !hasTwoTypes.test(password) ||
      !lengthValid(password) ||
      password !== passwordCheck ||
      !nickname.trim()
    ) {
      return;
    }

    if (nicknameOk !== true) {
      setNicknameError('닉네임 중복 확인을 해주세요.');
      return;
    }

    startTransition(async () => {
      try {
        const result = await signupAction({
          email,
          password,
          nickname,
        });
        if (result.success) {
          alert('회원가입이 완료되었습니다.');
          router.push('/login');
        } else {
          setServerError(result.error!);
        }
      } catch (error) {
        setServerError(
          '일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
        );
      }
    });
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
            <p className="text-red-400 text-sm px-2">{emailError}</p>
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

          <div className="px-1 space-y-1">
            <p
              className={cn(
                `text-sm flex items-center gap-1 text-zinc-500`,
                password &&
                  (hasTwoTypes.test(password)
                    ? 'text-indigo-500'
                    : 'text-red-400'),
              )}
            >
              {password && !hasTwoTypes.test(password) ? (
                <X size={16} />
              ) : (
                <Check size={16} />
              )}{' '}
              영문/숫자/특수문자 중 2가지 이상 포함
            </p>
            <p
              className={cn(
                `text-sm flex items-center gap-1 text-zinc-500`,
                password &&
                  (lengthValid(password) ? 'text-indigo-500' : 'text-red-400'),
              )}
            >
              {password && !lengthValid(password) ? (
                <X size={16} />
              ) : (
                <Check size={16} />
              )}{' '}
              8자 이상 32자 이하 입력 (공백 제외)
            </p>
          </div>

          {passwordError && (
            <p className="text-red-400 text-sm px-2">{passwordError}</p>
          )}
        </div>

        {/* 비밀번호 확인 */}
        <div className="space-y-2">
          <Label className="text-white">비밀번호 확인</Label>

          <Input
            type="password"
            placeholder="비밀번호 확인"
            value={passwordCheck}
            onChange={handleChangePasswordCheck}
            className={`bg-zinc-800 text-white placeholder:text-zinc-500 border border-zinc-800  ${
              password && passwordCheck && passwordCheckError
                ? 'border-red-400'
                : 'border-zinc-800'
            }`}
          />

          {password && passwordCheck && passwordCheckError && (
            <p className="text-red-400 text-sm px-2">{passwordCheckError}</p>
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
              disabled={isPending}
            >
              중복 확인
            </Button>
          </div>

          {nicknameError && (
            <p className="text-red-400 text-sm px-2">{nicknameError}</p>
          )}
          {nicknameOk && (
            <p className="text-indigo-500 text-sm px-2">
              사용 가능한 닉네임입니다.
            </p>
          )}
        </div>

        {serverError && (
          <div className="flex items-center gap-2 p-3 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-md animate-in fade-in slide-in-from-bottom-2">
            <AlertCircle size={16} className="shrink-0" />
            <p>{serverError}</p>
          </div>
        )}

        {/* 제출 버튼 */}
        <Button
          type="submit"
          className="w-full bg-white text-black font-semibold hover:bg-gray-200 cursor-pointer"
          disabled={isPending}
        >
          계정 생성하기
        </Button>
      </form>

      {/* 로그인 + 홈 링크 */}
      <div className="mt-6 text-center text-sm text-zinc-500">
        이미 계정이 있으신가요?{' '}
        <Link href="/login" className="text-indigo-500 font-semibold">
          로그인
        </Link>
        <div className="mt-3">
          <Link href="/" className="text-zinc-500 hover:text-white">
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}
