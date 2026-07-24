import type { Metadata } from "next";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://kidwords.github.io") + basePath;
const authorName = "kidwords";
const authorBio = "把 AI 的想法，做成真正能用的项目。";

export function personJsonLd(): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Person",
    name: authorName,
    url: siteUrl,
    description: authorBio,
    sameAs: [
      "https://github.com/kidwords",
      "https://gitee.com/kidwords",
    ],
  });
}

export function websiteJsonLd(): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${authorName} 的个人项目档案`,
    url: siteUrl,
    inLanguage: "zh-CN",
  });
}

export function siteMetadata(): Metadata {
  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: `${authorName} | AI 项目与产品实践`,
      template: `%s · ${authorName}`,
    },
    description: authorBio,
    applicationName: `${authorName} 的展示站`,
    generator: `${authorName}-site`,
    authors: [{ name: authorName, url: siteUrl }],
    creator: authorName,
    publisher: authorName,
    alternates: { canonical: siteUrl },
    openGraph: {
      type: "website",
      locale: "zh_CN",
      url: siteUrl,
      siteName: `${authorName} 的展示站`,
      title: `${authorName} | AI 项目与产品实践`,
      description: authorBio,
    },
    twitter: {
      card: "summary_large_image",
      title: `${authorName} | AI 项目与产品实践`,
      description: authorBio,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
  };
}

export const siteConstant = {
  siteUrl,
  basePath,
  authorName,
  authorBio,
};