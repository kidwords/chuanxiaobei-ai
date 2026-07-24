import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="text-sm font-medium text-blue-600 dark:text-blue-400">404</p>
      <h1 className="text-3xl font-semibold leading-[1.3]">这一页还没建好。</h1>
      <p className="text-base text-zinc-600 dark:text-zinc-300">先回到首页看看其他内容。</p>
      <Link className="inline-flex h-11 items-center gap-2 rounded-[10px] bg-blue-600 px-5 text-sm font-medium text-white shadow-sm transition-colors duration-250 hover:-translate-y-0.5 hover:bg-blue-700" href="/">
        回到首页
      </Link>
    </section>
  );
}