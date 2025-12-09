'use client';

import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { signupAction, checkNicknameAction } from '../actions';
import { useRouter } from 'next/navigation';

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
  const [passwordError, setPasswordError] = useState('');
  const [passwordCheckError, setPasswordCheckError] = useState('');
  const [passwordTouched, setPasswordTouched] = useState(false);

  // 정규식
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const hasTwoTypes =
    /(?=.*[A-Za-z])(?=.*\d)|(?=.*[A-Za-z])(?=.*[!@#$%])|(?=.*\d)(?=.*[!@#$%])/.test(
      password,
    );
  const lengthValid = password.length >= 8 && password.length <= 32;

  // 이메일 검사
  const validateEmail = () => {
    if (!emailRegex.test(email)) {
      setEmailError('이메일 형식이 올바르지 않습니다.');
    } else {
      setEmailError('');
    }
  };

  // 비밀번호 검사
  const validatePassword = () => {
    if (!passwordTouched) return;

    if (!hasTwoTypes || !lengthValid) {
      setPasswordError('비밀번호 조건을 충족하지 않습니다.');
    } else {
      setPasswordError('');
    }
  };

  // 비밀번호 확인
  const validatePasswordCheck = () => {
    if (password !== passwordCheck) {
      setPasswordCheckError('비밀번호가 일치하지 않습니다.');
    } else {
      setPasswordCheckError('');
    }
  };

  // 색상 함수
  const getCondColor = (cond: boolean) => {
    if (!passwordTouched) return 'text-[#A1A1AA]';
    return cond ? 'text-[#7C86FF]' : 'text-[#FF6467]';
  };

  // 닉네임 중복 확인
  const handleCheckNickname = async () => {
    setNicknameError('');
    setNicknameOk(null);

    if (!nickname.trim()) {
      setNicknameError('닉네임을 입력해주세요.');
      return;
    }

    const res = await checkNicknameAction(nickname);

    if (!res.success) {
      setNicknameError(res.message);
      return;
    }

    if (res.data === true) {
      // true = 중복됨
      setNicknameError('중복된 닉네임입니다.');
      setNicknameOk(false);
    } else {
      setNicknameOk(true);
    }
  };

  // 제출
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    validateEmail();
    validatePassword();
    validatePasswordCheck();

    if (emailError || passwordError || passwordCheckError || nicknameError)
      return;

    const res = await signupAction({
      email,
      password,
      nickname,
    });

    if (!res.success) {
      setEmailError(res.message);
      return;
    }

    router.push('/login');
  };

  return (
    <div className="w-full max-w-md bg-[#18181B]/50 border border-[#27272A] rounded-xl p-8 shadow-lg">
      <h1 className="text-center text-2xl font-semibold mb-2 text-white">
        회원가입
      </h1>
      <p className="text-center text-sm text-[#A1A1AA] mb-6">
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
            onChange={(e) => setEmail(e.target.value)}
            onBlur={validateEmail}
            className={`bg-[#09090B] text-white placeholder:text-[#A1A1AA] border ${
              emailError ? 'border-[#FF6467]' : 'border-[#27272A]'
            }`}
          />
          {emailError && <p className="text-[#FF6467] text-sm">{emailError}</p>}
        </div>

        {/* 비밀번호 */}
        <div className="space-y-2">
          <Label className="text-white">비밀번호</Label>

          <Input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordTouched(true);
            }}
            onBlur={validatePassword}
            className={`bg-[#09090B] text-white placeholder:text-[#A1A1AA] border ${
              passwordError ? 'border-[#FF6467]' : 'border-[#27272A]'
            }`}
          />

          <div className="ml-1 space-y-1">
            <p
              className={`text-sm flex items-center gap-1 ${getCondColor(
                hasTwoTypes,
              )}`}
            >
              <Check size={16} /> 영문/숫자/특수문자 중 2가지 이상 포함
            </p>
            <p
              className={`text-sm flex items-center gap-1 ${getCondColor(
                lengthValid,
              )}`}
            >
              <Check size={16} /> 8자 이상 32자 이하 입력 (공백 제외)
            </p>
          </div>

          {passwordError && (
            <p className="text-[#FF6467] text-sm">{passwordError}</p>
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
            onBlur={validatePasswordCheck}
            className={`bg-[#09090B] text-white placeholder:text-[#A1A1AA] border ${
              passwordCheckError ? 'border-[#FF6467]' : 'border-[#27272A]'
            }`}
          />

          {passwordCheckError && (
            <p className="text-[#FF6467] text-sm">{passwordCheckError}</p>
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
              className={`bg-[#09090B] text-white placeholder:text-[#A1A1AA] border ${
                nicknameError ? 'border-[#FF6467]' : 'border-[#27272A]'
              }`}
            />
            <Button
              type="button"
              onClick={handleCheckNickname}
              className="bg-[#27272A] text-white hover:bg-[#3A3A3D]"
            >
              중복 확인
            </Button>
          </div>

          {nicknameError && (
            <p className="text-[#FF6467] text-sm">{nicknameError}</p>
          )}
          {nicknameOk && (
            <p className="text-[#7C86FF] text-sm">사용 가능한 닉네임입니다.</p>
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

      <div className="mt-6 text-center text-sm text-[#A1A1AA]">
        이미 계정이 있으신가요?{' '}
        <Link href="/login" className="text-[#7C86FF] font-semibold">
          로그인
        </Link>
      </div>
    </div>
  );
}
