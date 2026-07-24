import Image from "next/image";
import { GitFork, ExternalLink } from "lucide-react";

import { artworkSrc, projectHref } from "../../../lib/projects.data";
import type { ProjectMeta } from "../../../lib/projects";
import { Icon } from "./Icon";

export function ProjectGrid({ projects }: { projects: ProjectMeta[] }) {
  if (projects.length === 0) {
    return (
      <p className="rounded-[14px] border border-dashed border-zinc-200 px-4 py-12 text-center text-sm text-zinc-500 dark:border-white/10 dark:text-zinc-400">
        还没有可展示的开源项目。
      </p>
    );
  }
  return (
    <div className="grid gap-5">
      {projects.map((project) => (
        <article key={project.slug} className="grid overflow-hidden rounded-[14px] border border-zinc-200 bg-white shadow-sm transition-all duration-250 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-lg dark:border-white/10 dark:bg-zinc-900 dark:hover:border-white/20 md:grid-cols-[0.9fr_1.1fr]">
          <LinkArtwork src={artworkSrc(project.artwork)} alt={`${project.title}封面`} />
          <div className="flex flex-col p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="rounded-[10px] bg-zinc-100 px-2.5 py-1.5 font-mono text-xs font-medium text-zinc-600 dark:bg-white/10 dark:text-zinc-300">
                {project.repository}
              </span>
              <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">原创公开仓库</span>
            </div>
            <h3 className="mt-5 text-2xl font-semibold">
              <a className="hover:text-blue-600 dark:hover:text-blue-400" href={projectHref(project.slug)}>
                {project.title}
              </a>
            </h3>
            <p className="mt-4 max-w-2xl text-sm leading-[1.8] text-zinc-600 dark:text-zinc-300">{project.summary}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="rounded-[10px] bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-600 dark:bg-white/10 dark:text-zinc-300">{tag}</span>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a className="inline-flex h-10 items-center gap-2 rounded-[10px] bg-zinc-950 px-4 text-sm font-medium text-white transition-all duration-250 hover:-translate-y-0.5 hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200" href={project.github} target="_blank" rel="noreferrer">
                <Icon size={16}>{GitFork}</Icon> 查看源代码 <Icon size={14}>{ExternalLink}</Icon>
              </a>
              {project.demo ? (
                <a className="inline-flex h-10 items-center gap-2 rounded-[10px] border border-zinc-200 bg-white px-4 text-sm font-medium text-zinc-800 transition-all duration-250 hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md dark:border-white/10 dark:bg-white/5 dark:text-white" href={project.demo} target="_blank" rel="noreferrer">
                  在线浏览
                </a>
              ) : null}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

function LinkArtwork({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative flex min-h-72 items-center justify-center overflow-hidden bg-[#ad8062] p-3 sm:min-h-80">
      <span className="absolute inset-0 -z-10 bg-gradient-to-br from-rose-700 via-amber-700 to-emerald-800" aria-hidden="true" />
      <Image alt={alt} className="object-contain" fill sizes="(max-width: 768px) 100vw, 45vw" src={src} unoptimized />
    </div>
  );
}