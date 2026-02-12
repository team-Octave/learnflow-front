// learnflow-front/src/features/lectures/components/main/MainVisual.tsx
'use client';

export default function MainVisual() {
  return (
    <section className="py-20 md:py-32 overflow-hidden flex justify-center items-center">
      <div className="container px-4 md:px-8 relative z-10">
        <div className="flex flex-col items-center text-center space-y-8 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
            성장을 위한 <span className="text-indigo-500">최고의 선택</span>
          </h1>

          <h3 className="text-lg md:text-xl text-muted-foreground max-w-2xl">
            자유롭게 학습하고 지식을 공유하세요.
            <br className="hidden md:block" />
            당신의 커리어 성장을 LearnFlow가 함께합니다.
          </h3>
        </div>
      </div>
    </section>
  );
}
