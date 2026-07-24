import RSS from "rss";

import { listProjects } from "../../../lib/projects.data";
import { siteConstant } from "../../../lib/seo";

export const dynamic = "force-static";

export async function GET() {
  const { siteUrl, authorName, authorBio } = siteConstant;
  const projects = listProjects();

  const feed = new RSS({
    title: `${authorName} 的个人项目档案`,
    description: authorBio,
    site_url: siteUrl,
    feed_url: `${siteUrl}/feed.xml`,
    language: "zh-CN",
    pubDate: new Date(),
    ttl: 60,
  });

  for (const project of projects) {
    feed.item({
      title: project.title,
      description: project.summary,
      url: `${siteUrl}/projects/${project.slug}`,
      guid: project.slug,
      categories: project.tags,
      author: authorName,
      date: new Date(project.updatedAt ?? project.createdAt),
    });
  }

  return new Response(feed.xml({ indent: true }), {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}