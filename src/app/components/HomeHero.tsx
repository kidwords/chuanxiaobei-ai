import { siteConstant } from "../../../lib/seo";
import { projectDemoHref } from "../../../lib/projects.data";
import { ProjectGrid } from "./ProjectGrid";
import type { ProjectMeta } from "../../../lib/projects";

export function HomeHero({ projects }: { projects: ProjectMeta[] }) {
  const { basePath } = siteConstant;
  const featuredProject = projects.find((project) => project.demo);

  return (
    <div className="site-shell">
      <div className="min-h-screen bg-[#fafafa] text-zinc-950 transition-colors duration-250 dark:bg-zinc-950 dark:text-zinc-50">
        <section className="mx-auto grid max-w-6xl gap-12 px-4 pb-20 pt-20 sm:px-6 lg:grid-cols-[1fr_320px] lg:items-end lg:pb-28 lg:pt-28">
          <div>
            <div className="inline-flex items-center gap-2 rounded-[10px] border border-zinc-200 bg-white px-3 py-2 text-sm font-medium text-zinc-600 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-zinc-300">
              独立开发 · AI 实践 · 产品设计
            </div>
            <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-[1.2] tracking-[0.01em] sm:text-5xl lg:text-6xl">把 AI 的想法，做成真正能用的项目。</h1>
            <p className="mt-6 max-w-2xl text-base leading-[1.7] text-zinc-600 sm:text-lg dark:text-zinc-300">{siteConstant.authorBio}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              {featuredProject?.demo ? (
                <a className="inline-flex h-11 items-center gap-2 rounded-[10px] bg-blue-600 px-5 text-sm font-medium text-white shadow-sm shadow-blue-600/20 transition-all duration-250 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-md" href={projectDemoHref(featuredProject.demo)}>
                  立即体验：中国传统色
                </a>
              ) : null}
              <a className="inline-flex h-11 items-center gap-2 rounded-[10px] border border-zinc-200 bg-white px-5 text-sm font-medium text-zinc-800 shadow-sm transition-all duration-250 hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md dark:border-white/10 dark:bg-white/5 dark:text-white" href={`${basePath}/projects`}>
                浏览项目
              </a>
            </div>
          </div>
          <aside className="border-l border-zinc-200 pl-6 dark:border-white/10" aria-label="已上线成果">
            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">已上线成果</p>
            <dl className="mt-5 grid grid-cols-3 gap-3 text-zinc-950 dark:text-zinc-50">
              <div>
                <dt className="text-2xl font-semibold">{String(projects.length).padStart(2, "0")}</dt>
                <dd className="mt-1 text-xs leading-[1.5] text-zinc-600 dark:text-zinc-300">可用工具</dd>
              </div>
              <div>
                <dt className="text-2xl font-semibold">384</dt>
                <dd className="mt-1 text-xs leading-[1.5] text-zinc-600 dark:text-zinc-300">传统色</dd>
              </div>
              <div>
                <dt className="text-2xl font-semibold">24</dt>
                <dd className="mt-1 text-xs leading-[1.5] text-zinc-600 dark:text-zinc-300">节气灵感</dd>
              </div>
            </dl>
          </aside>
        </section>
        <section className="border-y border-zinc-200 bg-white py-16 dark:border-white/10 dark:bg-zinc-900/40 sm:py-20" id="projects">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4 sm:mb-10">
              <div>
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">开源项目</p>
                <h2 className="mt-2 text-3xl font-semibold leading-[1.3]">公开、原创、持续维护。</h2>
              </div>
              <span className="text-sm text-zinc-500 dark:text-zinc-400">
                {projectCountLabel(projects.length)}
              </span>
            </div>
            <p className="mb-8 max-w-2xl text-sm leading-[1.7] text-zinc-600 dark:text-zinc-300">不展示私有项目，也不把 Fork 仓库作为个人作品。每一项都提供源代码与可访问的在线版本。</p>
            <ProjectGrid projects={projects.slice(0, 3)} />
          </div>
        </section>
      </div>
    </div>
  );
}

function projectCountLabel(count: number): string {
  const year = new Date().getFullYear();
  return `${year} / ${String(count).padStart(2, "0")} 项`;
}
