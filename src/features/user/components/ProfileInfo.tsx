'use client';

import { Input } from '@/components/ui/input';

export default function ProfileInfo() {
  const nickname = '김철수';
  const email = 'chulsoo@example.com';

  return (
    <section className="w-full p-6 rounded-xl bg-zinc-900/40 border border-zinc-700 text-white ">
      <h2 className="text-xl font-bold">프로필 정보</h2>

      {/* 닉네임 */}
      <div className="mt-6">
        <label className="block mb-2 text-sm text-white">닉네임</label>
        <Input
          value={nickname}
          disabled
          className="bg-zinc-800/40 border-zinc-700 text-zinc-300"
        />
      </div>

      {/* 이메일 */}
      <div className="mt-6">
        <label className="block mb-2 text-sm text-white">이메일</label>
        <Input
          value={email}
          disabled
          className="bg-zinc-800/40 border-zinc-700 text-zinc-300"
        />
      </div>
    </section>
  );
}
