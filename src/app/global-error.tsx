"use client";

export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-[#fafafa] text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50">
        <main className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center gap-6 px-6 text-center">
          <h1 className="text-3xl font-semibold">页面加载失败</h1>
          <p className="text-base text-zinc-600 dark:text-zinc-300">请稍后重试，或刷新本页。</p>
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex h-11 items-center gap-2 rounded-[10px] bg-blue-600 px-5 text-sm font-medium text-white shadow-sm transition-colors duration-250 hover:bg-blue-700"
          >
            重试
          </button>
        </main>
      </body>
    </html>
  );
}