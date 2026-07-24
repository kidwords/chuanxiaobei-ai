import type { MetadataRoute } from "next";

import { listProjects } from "../../lib/projects.data";
import { siteConstant } from "../../lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const { siteUrl } = siteConstant;
  const now = new Date();
  const base: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/projects`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];
  const projects = listProjects().map((project: { slug: string; updatedAt?: string; createdAt: string }) => ({
    url: `${siteUrl}/projects/${project.slug}`,
    lastModified: new Date(project.updatedAt ?? project.createdAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
  return [...base, ...projects];
}