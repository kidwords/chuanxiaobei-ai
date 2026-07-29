import "server-only";

import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";

import type { Project, ProjectMeta, ProjectFrontmatter } from "./projects";

const PROJECTS_DIR = join(process.cwd(), "content", "projects");
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

function normalizeFilename(name: string): string {
  return name.replace(/\.mdx?$/i, "");
}

function listProjectFiles(): string[] {
  try {
    return readdirSync(PROJECTS_DIR).filter((f) => f.endsWith(".mdx"));
  } catch {
    return [];
  }
}

function readProjectFile(slug: string): {
  frontmatter: ProjectFrontmatter;
  body: string;
} {
  const file = join(PROJECTS_DIR, `${slug}.mdx`);
  const raw = readFileSync(file, "utf8");
  const parsed = matter(raw);
  const data = parsed.data as ProjectFrontmatter;
  return { frontmatter: data, body: parsed.content };
}

function validate(slug: string, data: ProjectFrontmatter): void {
  const required: (keyof ProjectFrontmatter)[] = [
    "title",
    "summary",
    "repository",
    "tags",
    "license",
    "status",
    "createdAt",
    "updatedAt",
    "github",
    "artwork",
  ];
  for (const key of required) {
    if (data[key] === undefined) {
      throw new Error(`Project ${slug} missing required frontmatter: ${key}`);
    }
  }
}

export function listProjects(): ProjectMeta[] {
  return listProjectFiles()
    .map((file) => {
      const slug = normalizeFilename(file);
      const { frontmatter } = readProjectFile(slug);
      validate(slug, frontmatter);
      return { slug, ...frontmatter };
    })
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export async function getProject(slug: string): Promise<Project> {
  if (!/^[a-z0-9-]+$/i.test(slug)) {
    throw new Error(`Invalid project slug: ${slug}`);
  }
  const { frontmatter, body } = readProjectFile(slug);
  validate(slug, frontmatter);
  const content = await MDXRemote({ source: body, options: { parseFrontmatter: false } });
  return { slug, ...frontmatter, content };
}

export function artworkSrc(artwork: string): string {
  if (!artwork.startsWith("/")) return artwork;
  return artwork.startsWith(basePath) ? artwork : `${basePath}${artwork}`;
}

export function projectHref(slug: string): string {
  return `${basePath}/projects/${slug}`;
}

export function projectDemoHref(demo: string): string {
  if (!demo.startsWith("/")) return demo;
  return demo.startsWith(basePath) ? demo : `${basePath}${demo}`;
}
