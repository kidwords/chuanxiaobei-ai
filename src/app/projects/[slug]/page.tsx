import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { GitFork, ExternalLink } from "lucide-react";

import { Icon } from "../../components/Icon";
import { artworkSrc, getProject, listProjects } from "../../../../lib/projects.data";
import { siteConstant } from "../../../../lib/seo";

interface ProjectRouteProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return listProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `${siteConstant.basePath || ""}/projects/${slug}` },
    openGraph: {
      title: project.title,
      description: project.summary,
      url: `${siteConstant.siteUrl}/projects/${slug}`,
      images: [{ url: `${siteConstant.siteUrl}${artworkSrc(project.artwork)}` }],
    },
  };
}

export default async function ProjectPage({ params }: ProjectRouteProps) {
  const { slug } = await params;
  try {
    const project = await getProject(slug);
    return (
      <article className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20">
        <a className="inline-flex items-center gap-1 text-sm text-blue-600 hover:underline dark:text-blue-400" href="/projects">
          ← 全部项目
        </a>
        <header className="mt-6 flex flex-col gap-4">
          <p className="font-mono text-sm text-zinc-500 dark:text-zinc-400">{project.repository}</p>
          <h1 className="text-4xl font-semibold leading-[1.2] tracking-[0.01em] sm:text-5xl">{project.title}</h1>
          <p className="text-base leading-[1.7] text-zinc-600 dark:text-zinc-300">{project.summary}</p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag: string) => (
              <span key={tag} className="rounded-[10px] bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-600 dark:bg-white/10 dark:text-zinc-300">{tag}</span>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            <a className="inline-flex h-10 items-center gap-2 rounded-[10px] bg-zinc-950 px-4 text-sm font-medium text-white transition-all duration-250 hover:-translate-y-0.5 hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200" href={project.github} target="_blank" rel="noreferrer">
              <Icon size={16}>{GitFork}</Icon> 查看源代码 <Icon size={14}>{ExternalLink}</Icon>
            </a>
            {project.demo ? (
              <a className="inline-flex h-10 items-center gap-2 rounded-[10px] border border-zinc-200 bg-white px-4 text-sm font-medium text-zinc-800 transition-all duration-250 hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md dark:border-white/10 dark:bg-white/5 dark:text-white" href={project.demo} target="_blank" rel="noreferrer">
                在线浏览
              </a>
            ) : null}
          </div>
        </header>
        <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-[14px] border border-zinc-200 bg-[#ad8062] p-3 dark:border-white/10">
          <Image alt={`${project.title}封面`} className="object-contain" fill sizes="(max-width: 768px) 100vw, 720px" src={artworkSrc(project.artwork)} unoptimized />
        </div>
        <div className="prose prose-zinc max-w-none dark:prose-invert mt-10">
          {project.content}
        </div>
        <footer className="mt-12 flex items-center justify-between border-t border-zinc-200 pt-6 text-sm text-zinc-500 dark:border-white/10 dark:text-zinc-400">
          <span>更新于 {project.updatedAt}</span>
          <span>{project.license}</span>
        </footer>
      </article>
    );
  } catch {
    notFound();
  }
}