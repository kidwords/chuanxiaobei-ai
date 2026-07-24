import { siteConstant } from "../../../lib/seo";

export function SiteFooter() {
  const { authorName } = siteConstant;
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-zinc-200 bg-[#fafafa] px-4 py-6 text-sm text-zinc-500 dark:border-white/10 dark:bg-zinc-950 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col justify-between gap-2 sm:flex-row">
        <span>© {year} {authorName}</span>
        <span>Built for GitHub Pages</span>
      </div>
    </footer>
  );
}