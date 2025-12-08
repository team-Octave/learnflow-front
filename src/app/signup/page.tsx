"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Check } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();

  // 입력값
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [nickname, setNickname] = useState("");

  // 터치 여부
  const [passwordTouched, setPasswordTouched] = useState(false);

  // 에러 상태
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordCheckError, setPasswordCheckError] = useState("");
  const [nicknameError, setNicknameError] = useState("");
  const [nicknameOk, setNicknameOk] = useState<boolean | null>(null);

  // 이메일 정규식
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateEmail = () => {
    if (!emailRegex.test(email)) {
      setEmailError("이메일 형식이 올바르지 않습니다.");
    } else {
      setEmailError("");
    }
  };

  // 비밀번호 조건 검사
  const hasTwoTypes =
    /(?=.*[A-Za-z])(?=.*\d)|(?=.*[A-Za-z])(?=.*[!@#$%])|(?=.*\d)(?=.*[!@#$%])/.test(password);

  const lengthValid = password.length >= 8 && password.length <= 32;

  const validatePassword = () => {
    if (!passwordTouched) return;
    if (!hasTwoTypes || !lengthValid) {
      setPasswordError("비밀번호 조건을 충족하지 않습니다.");
    } else {
      setPasswordError("");
    }
  };

  const validatePasswordCheck = () => {
    if (password !== passwordCheck) {
      setPasswordCheckError("비밀번호가 일치하지 않습니다.");
    } else {
      setPasswordCheckError("");
    }
  };

  // 닉네임 중복 확인
  const handleCheckNickname = async () => {
    setNicknameError("");

    try {
      const res = await fetch(
        `http://localhost:8080/api/v1/users/check?nickname=${nickname}`
      );

      const data = await res.json();

      if (data.success) {
        setNicknameOk(!data.data ? true : false);
        if (data.data === true) {
          setNicknameError("중복된 닉네임입니다.");
        }
      } else {
        setNicknameError("닉네임 확인 중 오류가 발생했습니다.");
      }
    } catch (err) {
      setNicknameError("닉네임 확인 중 오류가 발생했습니다.");
    }
  };

  // 색상 함수
  const getCondColor = (cond: boolean) => {
    if (!passwordTouched) return "text-[#A1A1AA]";
    return cond ? "text-[#7C86FF]" : "text-[#FF6467]";
  };

  // 최종 제출
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    validateEmail();
    validatePassword();
    validatePasswordCheck();

    if (emailError || passwordError || passwordCheckError || nicknameError) return;

    try {
      const res = await fetch("http://localhost:8080/api/v1/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, nickname }),
      });

      const data = await res.json();

      if (!res.ok || data.success === false) {
        setEmailError(data.message || "회원가입 중 오류가 발생했습니다.");
        return;
      }

      router.push("/login");
    } catch (err) {
      setEmailError("회원가입 중 문제가 발생했습니다.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="w-full max-w-md bg-[#18181B]/50 border border-[#27272A] rounded-xl p-8 shadow-lg">

        <h1 className="text-center text-2xl font-semibold mb-2">회원가입</h1>
        <p className="text-center text-sm text-[#A1A1AA] mb-6">
          새로운 계정을 생성하고 학습을 시작하세요
        </p>

        <form onSubmit={handleSignup} className="space-y-6">

          {/* 이메일 */}
          <div className="space-y-2">
            <Label className="text-white">이메일</Label>
            <Input
              type="email"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={validateEmail}
              className={`bg-[#09090B] text-white placeholder:text-[#A1A1AA] border ${
                emailError ? "border-[#FF6467]" : "border-[#27272A]"
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
                passwordError ? "border-[#FF6467]" : "border-[#27272A]"
              }`}
            />

            <div className="ml-1 space-y-1">
              <p className={`text-sm flex items-center gap-1 ${getCondColor(hasTwoTypes)}`}>
                <Check size={16} /> 영문/숫자/특수문자 중, 2가지 이상 포함
              </p>
              <p className={`text-sm flex items-center gap-1 ${getCondColor(lengthValid)}`}>
                <Check size={16} /> 8자 이상 32자 이하 입력 (공백 제외)
              </p>
            </div>

            {passwordError && <p className="text-[#FF6467] text-sm">{passwordError}</p>}
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
                passwordCheckError ? "border-[#FF6467]" : "border-[#27272A]"
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
                  nicknameError ? "border-[#FF6467]" : "border-[#27272A]"
                }`}
              />
              <Button
                type="button"
                className="bg-[#27272A] text-white hover:bg-[#3A3A3D]"
                onClick={handleCheckNickname}
              >
                중복 확인
              </Button>
            </div>

            {nicknameError && <p className="text-[#FF6467] text-sm">{nicknameError}</p>}
            {nicknameOk && <p className="text-[#7C86FF] text-sm">사용 가능한 닉네임입니다.</p>}
          </div>

          {/* 제출 버튼 */}
          <Button type="submit" className="w-full bg-white text-black font-semibold hover:bg-gray-200">
            계정 생성하기
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-[#A1A1AA]">
          이미 계정이 있으신가요?{" "}
          <Link href="/login" className="text-[#7C86FF] font-semibold">로그인</Link>

          <div className="mt-2">
            <Link href="/" className="text-[#A1A1AA]">
              홈으로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
