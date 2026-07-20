"use client";

import Image from "next/image";
import {
  ArrowDownRight,
  ArrowRight,
  Bot,
  Code2,
  ExternalLink,
  GitFork,
  Layers3,
  Menu,
  Moon,
  Sparkles,
  Sun,
} from "lucide-react";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const asset = (path: string) => `${basePath}${path}`;

const openSourceProjects = [
  {
    title: "中国传统色",
    repository: "kidwords/chinese-traditional-colors",
    description: "整理《中国传统色：故宫里的色彩美学》完整 384 色，按 24 节气与 72 物候编排，附标准 Hex 色值与 AI 配色使用建议。",
    tags: ["HTML", "384 色", "东方美学", "Apache-2.0"],
    github: "https://github.com/kidwords/chinese-traditional-colors",
    demo: "https://kidwords.github.io/chinese-traditional-colors/",
    image: "/assets/projects/chinese-traditional-colors-seasons.png",
  },
];

const capabilities = [
  ["AI 应用", "从模型能力到真实业务流程，构建可交付的 AI 产品。", Bot],
  ["产品与界面", "用清晰的信息结构和克制的视觉，让复杂工具更好上手。", Layers3],
  ["工程实现", "将原型推进为可部署、可维护、可迭代的静态站与应用。", Code2],
] as const;

function NavLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) {
  return (
    <a className="rounded-[10px] px-3 py-2 text-sm font-medium text-zinc-600 transition-all duration-250 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-300 dark:hover:bg-white/10 dark:hover:text-white" href={href} onClick={onClick}>
      {children}
    </a>
  );
}

function ThemeButton() {
  return (
    <label aria-label="切换深色模式" className="flex size-10 cursor-pointer items-center justify-center rounded-[10px] border border-zinc-200 bg-white text-zinc-700 shadow-sm transition-all duration-250 hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md dark:border-white/10 dark:bg-white/5 dark:text-zinc-200">
      <input className="peer sr-only" id="theme-toggle" type="checkbox" />
      <Moon className="peer-checked:hidden" size={17} />
      <Sun className="hidden peer-checked:block" size={17} />
    </label>
  );
}

function TraditionalColorArtwork({ image, title }: Pick<(typeof openSourceProjects)[number], "image" | "title">) {
  return (
    <div className="relative min-h-72 overflow-hidden bg-[#ad8062] p-3 sm:min-h-80">
      <Image alt={`${title}四季传统色预览`} className="object-contain" fill sizes="(max-width: 768px) 100vw, 45vw" src={asset(image)} unoptimized />
    </div>
  );
}

export default function Home() {
  return (
    <div className="site-shell">
      <div className="min-h-screen bg-[#fafafa] text-zinc-950 transition-colors duration-250 dark:bg-zinc-950 dark:text-zinc-50">
        <header className="sticky top-0 z-50 border-b border-zinc-200/80 bg-[#fafafa]/88 backdrop-blur-xl dark:border-white/10 dark:bg-zinc-950/85">
          <div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
            <a className="group flex items-center gap-3" href="#top" aria-label="川小北AI 首页">
              <span className="flex size-10 items-center justify-center rounded-[14px] bg-zinc-950 text-sm font-semibold text-white shadow-sm transition-transform duration-250 group-hover:scale-[1.02] dark:bg-white dark:text-zinc-950">川</span>
              <span className="text-lg font-semibold tracking-[0.04em]">川小北AI</span>
            </a>
            <nav className="hidden items-center gap-1 md:flex" aria-label="主导航">
              <NavLink href="#projects">项目</NavLink>
              <NavLink href="#about">关于</NavLink>
              <NavLink href="#contact">联系</NavLink>
            </nav>
            <div className="flex items-center gap-2">
              <ThemeButton />
              <a className="hidden h-10 items-center gap-2 rounded-[10px] bg-zinc-950 px-4 text-sm font-medium text-white shadow-sm transition-all duration-250 hover:-translate-y-0.5 hover:bg-zinc-800 hover:shadow-md sm:inline-flex dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200" href="#contact">
                开始交流 <ArrowRight size={15} />
              </a>
              <details className="relative md:hidden">
                <summary aria-label="打开导航" className="flex size-10 list-none items-center justify-center rounded-[10px] border border-zinc-200 bg-white text-zinc-700 transition-all duration-250 hover:bg-zinc-100 dark:border-white/10 dark:bg-white/5 dark:text-white"><Menu size={18} /></summary>
                <nav className="absolute right-0 top-12 w-32 rounded-[10px] border border-zinc-200 bg-white p-2 shadow-lg dark:border-white/10 dark:bg-zinc-900" aria-label="移动导航">
                  <NavLink href="#projects">项目</NavLink>
                  <NavLink href="#about">关于</NavLink>
                  <NavLink href="#contact">联系</NavLink>
                </nav>
              </details>
            </div>
          </div>
        </header>

        <main id="top">
          <section className="mx-auto grid max-w-6xl gap-12 px-4 pb-20 pt-20 sm:px-6 lg:grid-cols-[1fr_320px] lg:items-end lg:pb-28 lg:pt-28">
            <div>
              <div className="inline-flex items-center gap-2 rounded-[10px] border border-zinc-200 bg-white px-3 py-2 text-sm font-medium text-zinc-600 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-zinc-300">
                <Sparkles size={15} className="text-blue-600 dark:text-blue-400" /> 独立开发 · AI 实践 · 产品设计
              </div>
              <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-[1.2] tracking-[0.01em] sm:text-5xl lg:text-6xl">把 AI 的想法，做成真正能用的项目。</h1>
              <p className="mt-6 max-w-2xl text-base leading-[1.7] text-zinc-600 sm:text-lg dark:text-zinc-300">川小北AI是我的公开项目档案。这里仅收录由我创建、维护并公开的开源作品，记录从灵感到上线的过程。</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a className="inline-flex h-11 items-center gap-2 rounded-[10px] bg-blue-600 px-5 text-sm font-medium text-white shadow-sm shadow-blue-600/20 transition-all duration-250 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-md" href="#projects">
                  浏览项目 <ArrowDownRight size={16} />
                </a>
                <a className="inline-flex h-11 items-center gap-2 rounded-[10px] border border-zinc-200 bg-white px-5 text-sm font-medium text-zinc-800 shadow-sm transition-all duration-250 hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md dark:border-white/10 dark:bg-white/5 dark:text-white" href="#about">
                  了解我 <ArrowRight size={16} />
                </a>
              </div>
            </div>
            <aside className="border-l border-zinc-200 pl-6 dark:border-white/10">
              <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">持续构建</p>
              <p className="mt-3 text-4xl font-semibold">01</p>
              <p className="mt-2 text-sm leading-[1.6] text-zinc-600 dark:text-zinc-300">个原创公开项目，持续更新中。</p>
            </aside>
          </section>

          <section id="projects" className="border-y border-zinc-200 bg-white py-16 dark:border-white/10 dark:bg-zinc-900/40 sm:py-20">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
              <div className="mb-8 flex flex-wrap items-end justify-between gap-4 sm:mb-10">
                <div>
                  <p className="text-sm font-medium text-blue-600 dark:text-blue-400">开源项目</p>
                  <h2 className="mt-2 text-3xl font-semibold leading-[1.3]">公开、原创、持续维护。</h2>
                </div>
                <span className="text-sm text-zinc-500 dark:text-zinc-400">2026 / 01 项</span>
              </div>
              <p className="mb-8 max-w-2xl text-sm leading-[1.7] text-zinc-600 dark:text-zinc-300">不展示私有项目，也不把 Fork 仓库作为个人作品。每一项都提供源代码与可访问的在线版本。</p>
              <div className="grid gap-5">
                {openSourceProjects.map((project) => (
                  <article className="grid overflow-hidden rounded-[14px] border border-zinc-200 bg-white shadow-sm transition-all duration-250 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-lg dark:border-white/10 dark:bg-zinc-900 dark:hover:border-white/20 md:grid-cols-[0.9fr_1.1fr]" key={project.title}>
                    <TraditionalColorArtwork image={project.image} title={project.title} />
                    <div className="flex flex-col p-6 sm:p-8">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <span className="rounded-[10px] bg-zinc-100 px-2.5 py-1.5 font-mono text-xs font-medium text-zinc-600 dark:bg-white/10 dark:text-zinc-300">{project.repository}</span>
                        <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">原创公开仓库</span>
                      </div>
                      <h3 className="mt-5 text-2xl font-semibold">{project.title}</h3>
                      <p className="mt-4 max-w-2xl text-sm leading-[1.8] text-zinc-600 dark:text-zinc-300">{project.description}</p>
                      <div className="mt-6 flex flex-wrap gap-2">
                        {project.tags.map((tag) => <span className="rounded-[10px] bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-600 dark:bg-white/10 dark:text-zinc-300" key={tag}>{tag}</span>)}
                      </div>
                      <div className="mt-8 flex flex-wrap gap-3">
                        <a className="inline-flex h-10 items-center gap-2 rounded-[10px] bg-zinc-950 px-4 text-sm font-medium text-white transition-all duration-250 hover:-translate-y-0.5 hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200" href={project.github} target="_blank" rel="noreferrer"><GitFork size={16} /> 查看源代码 <ExternalLink size={14} /></a>
                        <a className="inline-flex h-10 items-center gap-2 rounded-[10px] border border-zinc-200 bg-white px-4 text-sm font-medium text-zinc-800 transition-all duration-250 hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md dark:border-white/10 dark:bg-white/5 dark:text-white" href={project.demo} target="_blank" rel="noreferrer">在线浏览 <ArrowUpRightIcon /></a>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section id="about" className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:py-28">
            <div>
              <p className="text-sm font-medium text-blue-600 dark:text-blue-400">关于川小北AI</p>
              <h2 className="mt-3 text-3xl font-semibold leading-[1.3]">不是展示概念，而是展示完成的东西。</h2>
              <p className="mt-6 text-base leading-[1.8] text-zinc-600 dark:text-zinc-300">我相信好的数字产品，既要有清晰的内容，也要有顺手的界面、扎实的工程和可被验证的结果。这里的每个项目都会保留它的思考、试验与落地过程。</p>
              <div className="mt-8 grid gap-3">
                <a className="group flex items-center justify-between rounded-[10px] border border-zinc-200 bg-white px-4 py-3 shadow-sm transition-all duration-250 hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md dark:border-white/10 dark:bg-zinc-900 dark:hover:border-white/20" href="https://github.com/kidwords" target="_blank" rel="noreferrer">
                  <span><span className="block text-xs font-medium text-zinc-500 dark:text-zinc-400">GitHub 项目地址</span><strong className="mt-1 block text-sm font-semibold">github.com/kidwords</strong></span>
                  <ExternalLink className="text-zinc-400 transition-transform duration-250 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 dark:text-zinc-300" size={16} />
                </a>
                <a className="group flex items-center justify-between rounded-[10px] border border-zinc-200 bg-white px-4 py-3 shadow-sm transition-all duration-250 hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md dark:border-white/10 dark:bg-zinc-900 dark:hover:border-white/20" href="https://gitee.com/kidwords" target="_blank" rel="noreferrer">
                  <span><span className="block text-xs font-medium text-zinc-500 dark:text-zinc-400">Gitee 项目地址</span><strong className="mt-1 block text-sm font-semibold">gitee.com/kidwords</strong></span>
                  <ExternalLink className="text-zinc-400 transition-transform duration-250 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 dark:text-zinc-300" size={16} />
                </a>
                <a className="group flex items-center justify-between rounded-[10px] border border-zinc-200 bg-white px-4 py-3 shadow-sm transition-all duration-250 hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md dark:border-white/10 dark:bg-zinc-900 dark:hover:border-white/20" href="https://kidwords.github.io/chinese-traditional-colors/" target="_blank" rel="noreferrer">
                  <span><span className="block text-xs font-medium text-zinc-500 dark:text-zinc-400">网站展示</span><strong className="mt-1 block text-sm font-semibold">中国传统色，384 色 · 24 节气 · 4 季</strong></span>
                  <ExternalLink className="text-zinc-400 transition-transform duration-250 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 dark:text-zinc-300" size={16} />
                </a>
              </div>
            </div>
            <div className="grid gap-4">
              {capabilities.map(([title, description, Icon], index) => (
                <div className="flex gap-4 rounded-[14px] border border-zinc-200 bg-white p-5 shadow-sm transition-all duration-250 hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-zinc-900" key={title}>
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-[10px] bg-zinc-100 text-zinc-800 dark:bg-white/10 dark:text-zinc-100"><Icon size={18} /></span>
                  <div><span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">0{index + 1}</span><h3 className="mt-1 font-semibold">{title}</h3><p className="mt-2 text-sm leading-[1.7] text-zinc-600 dark:text-zinc-300">{description}</p></div>
                </div>
              ))}
            </div>
          </section>

          <section id="contact" className="bg-zinc-950 px-4 py-16 text-white sm:px-6 sm:py-20">
            <div className="mx-auto flex max-w-6xl flex-col justify-between gap-8 lg:flex-row lg:items-end">
              <div>
                <p className="text-sm font-medium text-zinc-400">联系</p>
                <h2 className="mt-3 max-w-2xl text-3xl font-semibold leading-[1.3] sm:text-4xl">通过 GitHub，关注正在发生的项目。</h2>
              </div>
              <div className="flex flex-wrap gap-3">
                <a className="inline-flex h-11 items-center gap-2 rounded-[10px] bg-white px-5 text-sm font-medium text-zinc-950 transition-all duration-250 hover:-translate-y-0.5 hover:bg-zinc-200" href="https://github.com/kidwords" target="_blank" rel="noreferrer"><GitFork size={16} /> GitHub 主页 <ExternalLink size={14} /></a>
              </div>
            </div>
          </section>
        </main>
        <footer className="border-t border-white/10 bg-zinc-950 px-4 py-6 text-sm text-zinc-500 sm:px-6"><div className="mx-auto flex max-w-6xl flex-col justify-between gap-2 sm:flex-row"><span>© 2026 川小北AI</span><span>Built for GitHub Pages</span></div></footer>
      </div>
    </div>
  );
}

function ArrowUpRightIcon() {
  return <ArrowRight className="-rotate-45" size={16} />;
}
