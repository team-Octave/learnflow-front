"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // 공백 체크
    if (!email || !password) {
      setError("이메일과 비밀번호를 모두 입력해주세요.");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok || data.success === false) {
        setError(data.message || "이메일 또는 비밀번호가 틀렸습니다.");
        return;
      }

      const { accessToken, refreshToken } = data.data;

      // JWT exp 파싱 함수
      const decodeExp = (token: string) => {
        const payload = JSON.parse(atob(token.split(".")[1]));
        return new Date(payload.exp * 1000);
      };

      const accessExp = decodeExp(accessToken);
      const refreshExp = decodeExp(refreshToken);

      // 쿠키 저장
      document.cookie = `accessToken=${accessToken}; path=/; expires=${accessExp.toUTCString()}; Secure; SameSite=Lax`;
      document.cookie = `refreshToken=${refreshToken}; path=/; expires=${refreshExp.toUTCString()}; Secure; SameSite=Lax`;

      router.push("/");
    } catch (err) {
      console.error(err);
      setError("로그인 중 문제가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-[#18181B]/50 border border-[#27272A] rounded-xl p-8 shadow-lg">

        {/* 제목 */}
        <h1 className="text-center text-2xl font-semibold mb-2">로그인</h1>
        <p className="text-center text-sm text-[#A1A1AA] mb-6">
          이메일과 비밀번호를 입력하여 로그인하세요
        </p>

        {/* 폼 */}
        <form onSubmit={handleLogin} noValidate className="space-y-4">

          {/* 이메일 입력 (type=email → type=text 로 변경) */}
          <Input
            type="text"
            placeholder="name@example.com"
            className={`bg-[#09090B] border ${
              error ? "border-[#FF6467]" : "border-[#27272A]"
            } text-white placeholder:text-[#A1A1AA]`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* 비밀번호 입력 */}
          <Input
            type="password"
            placeholder="비밀번호"
            className={`bg-[#09090B] border ${
              error ? "border-[#FF6467]" : "border-[#27272A]"
            } text-white placeholder:text-[#A1A1AA]`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* 에러 메시지 */}
          {error && <p className="text-[#FF6467] text-sm">{error}</p>}

          {/* 로그인 버튼 */}
          <Button
            type="submit"
            className="w-full bg-white text-black font-semibold hover:bg-gray-200"
          >
            로그인
          </Button>
        </form>

        {/* 하단 링크 */}
        <div className="mt-6 text-center text-sm text-[#A1A1AA]">
          계정이 없으신가요?{" "}
          <Link href="/signup" className="text-[#7C86FF] font-semibold">
            회원가입
          </Link>

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
