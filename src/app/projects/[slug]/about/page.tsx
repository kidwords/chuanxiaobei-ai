import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getProject, listProjects, projectHref } from "../../../../../lib/projects.data";
import { siteConstant } from "../../../../../lib/seo";

interface ProjectAboutRouteProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return listProjects()
    .filter((project) => project.embeddedDemo)
    .map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectAboutRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  return {
    title: `${project.title}介绍`,
    description: project.summary,
    alternates: { canonical: `${siteConstant.basePath || ""}/projects/${slug}/about` },
  };
}

export default async function ProjectAboutPage({ params }: ProjectAboutRouteProps) {
  const { slug } = await params;
  try {
    const project = await getProject(slug);
    return (
      <article className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20">
        <a className="inline-flex items-center gap-1 text-sm text-blue-600 hover:underline dark:text-blue-400" href={projectHref(slug)}>
          ← 打开项目
        </a>
        <header className="mt-6">
          <p className="font-mono text-sm text-zinc-500 dark:text-zinc-400">{project.repository}</p>
          <h1 className="mt-3 text-4xl font-semibold leading-[1.2] tracking-[0.01em] sm:text-5xl">{project.title}</h1>
          <p className="mt-4 text-base leading-[1.7] text-zinc-600 dark:text-zinc-300">{project.summary}</p>
        </header>
        <div className="prose prose-zinc mt-10 max-w-none dark:prose-invert">{project.content}</div>
      </article>
    );
  } catch {
    notFound();
  }
}
