// src/features/membership/components/CancelButton.tsx

'use client';

export default function CancelButton() {
  return (
    <button
      type="button"
      onClick={() => {
        // TODO: 해지 API 연결
        alert('멤버십 해지 (API 연동 전)');
      }}
      className="px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-medium rounded-lg transition-colors border border-zinc-700 text-sm"
    >
      멤버십 해지
    </button>
  );
}
