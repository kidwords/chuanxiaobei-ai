import type { Metadata } from "next";
import Link from "next/link";

import { ProjectGrid } from "../components/ProjectGrid";
import { listProjects } from "../../../lib/projects.data";
import { siteConstant } from "../../../lib/seo";

export const metadata: Metadata = {
  title: "开源项目",
  description: "公开、原创、持续维护的开源项目目录，按时间倒序排列，所有项目都提供源代码与可访问的在线版本。",
  alternates: { canonical: `${siteConstant.basePath || ""}/projects` },
};

export default function ProjectsPage() {
  const projects = listProjects();
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <header className="mb-12 max-w-2xl">
        <p className="text-sm font-medium text-blue-600 dark:text-blue-400">开源项目</p>
        <h1 className="mt-2 text-4xl font-semibold leading-[1.2] tracking-[0.01em] sm:text-5xl">公开、原创、持续维护。</h1>
        <p className="mt-6 text-base leading-[1.7] text-zinc-600 dark:text-zinc-300">所有项目都同时提供源代码与可访问的在线版本，按创建时间倒序排列；没有 Fork 仓库或私有项目。</p>
      </header>
      {projects.length > 0 ? (
        <ProjectGrid projects={projects} />
      ) : (
        <p className="rounded-[14px] border border-dashed border-zinc-200 px-4 py-12 text-center text-sm text-zinc-500 dark:border-white/10 dark:text-zinc-400">还没有可展示的开源项目。</p>
      )}
      <p className="mt-12 text-sm text-zinc-500 dark:text-zinc-400">
        回到 <Link className="text-blue-600 hover:underline dark:text-blue-400" href="/">首页</Link>。
      </p>
    </section>
  );
}