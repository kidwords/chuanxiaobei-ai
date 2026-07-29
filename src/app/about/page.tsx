import type { Metadata } from "next";

import { siteConstant } from "../../../lib/seo";

export const metadata: Metadata = {
  title: "关于我",
  description: `${siteConstant.authorName} 的个人项目档案，关于独立开发、AI 实践、产品设计与工程实现的记录。`,
  alternates: { canonical: `${siteConstant.basePath || ""}/about` },
};

const capabilities = [
  { title: "AI 应用", description: "从模型能力到真实业务流程，构建可交付的 AI 产品。" },
  { title: "产品与界面", description: "用清晰的信息结构和克制的视觉，让复杂工具更好上手。" },
  { title: "工程实现", description: "将原型推进为可部署、可维护、可迭代的静态站与应用。" },
];

const workingMethod = [
  { title: "从真实问题开始", description: "先确认要解决的使用场景，再决定功能、内容和技术路径。" },
  { title: "尽早做成可用版本", description: "不把价值停留在概念与原型中，而是让人能够打开、使用和反馈。" },
  { title: "把细节持续打磨", description: "从访问路径、界面层级到部署稳定性，让每一次迭代都更接近完整体验。" },
];

const links = [
  { label: "GitHub 项目地址", href: "https://github.com/kidwords", value: "github.com/kidwords" },
  { label: "Gitee 项目地址", href: "https://gitee.com/kidwords", value: "gitee.com/kidwords" },
  { label: "网站展示", href: "https://kidwords.github.io/chinese-traditional-colors/", value: "中国传统色，384 色 · 24 节气 · 4 季" },
];

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <header className="max-w-2xl">
        <p className="text-sm font-medium text-blue-600 dark:text-blue-400">关于</p>
        <h1 className="mt-2 text-4xl font-semibold leading-[1.2] tracking-[0.01em] sm:text-5xl">不是展示概念，而是展示完成的东西。</h1>
        <p className="mt-6 text-base leading-[1.8] text-zinc-600 dark:text-zinc-300">我相信好的数字产品，既要有清晰的内容，也要有顺手的界面、扎实的工程和可被验证的结果。这里的每个项目都会保留它的思考、试验与落地过程。</p>
      </header>
      <ol className="mt-12 grid gap-4">
        {capabilities.map((item, index) => (
          <li key={item.title} className="flex gap-4 rounded-[14px] border border-zinc-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-zinc-900">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-[10px] bg-zinc-100 text-zinc-800 dark:bg-white/10 dark:text-zinc-100">
              0{index + 1}
            </span>
            <div>
              <h2 className="font-semibold">{item.title}</h2>
              <p className="mt-2 text-sm leading-[1.7] text-zinc-600 dark:text-zinc-300">{item.description}</p>
            </div>
          </li>
        ))}
      </ol>
      <section className="mt-12 grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="rounded-[14px] border border-zinc-200 bg-zinc-100 p-6 dark:border-white/10 dark:bg-white/5">
          <p className="text-sm font-medium text-blue-600 dark:text-blue-400">当前关注</p>
          <h2 className="mt-3 text-2xl font-semibold leading-[1.3]">让技术成为可以直接使用的体验。</h2>
          <p className="mt-4 text-sm leading-[1.8] text-zinc-600 dark:text-zinc-300">目前持续探索 AI 应用、中文内容工具与产品交互，也会把公开项目作为长期验证与迭代的载体。</p>
        </div>
        <div className="rounded-[14px] border border-zinc-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-900">
          <p className="text-sm font-medium text-blue-600 dark:text-blue-400">工作方式</p>
          <ul className="mt-5 grid gap-4 sm:grid-cols-3">
            {workingMethod.map((item) => (
              <li key={item.title}>
                <h3 className="text-sm font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-[1.7] text-zinc-600 dark:text-zinc-300">{item.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <ul className="mt-12 grid gap-3">
        {links.map((link) => (
          <li key={link.href}>
            <a className="group flex items-center justify-between rounded-[10px] border border-zinc-200 bg-white px-4 py-3 shadow-sm transition-all duration-250 hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md dark:border-white/10 dark:bg-zinc-900 dark:hover:border-white/20" href={link.href} target="_blank" rel="noreferrer">
              <span>
                <span className="block text-xs font-medium text-zinc-500 dark:text-zinc-400">{link.label}</span>
                <strong className="mt-1 block text-sm font-semibold">{link.value}</strong>
              </span>
              <span aria-hidden="true">↗</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
