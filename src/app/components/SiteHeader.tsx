import { siteConstant } from "../../../lib/seo";
import { ThemeSwitch } from "./ThemeSwitch";
import { MobileMenu } from "./MobileMenu";

function NavLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) {
  const { basePath } = siteConstant;
  const resolved = href.startsWith("/") ? `${basePath}${href}` : href;
  return (
    <a
      className="rounded-[10px] px-3 py-2 text-sm font-medium text-zinc-600 transition-all duration-250 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-300 dark:hover:bg-white/10 dark:hover:text-white"
      href={resolved}
      onClick={onClick}
    >
      {children}
    </a>
  );
}

export function SiteHeader() {
  const { basePath } = siteConstant;

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/80 bg-[#fafafa]/88 backdrop-blur-xl dark:border-white/10 dark:bg-zinc-950/85">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <a className="group flex items-center gap-3" href={`${basePath}/#top`} aria-label="川小北AI 首页">
          <span className="flex size-10 items-center justify-center rounded-[14px] bg-zinc-950 text-sm font-semibold text-white shadow-sm transition-transform duration-250 group-hover:scale-[1.02] dark:bg-white dark:text-zinc-950">川</span>
          <span className="text-lg font-semibold tracking-[0.04em]">川小北AI</span>
        </a>
        <nav className="hidden items-center gap-1 md:flex" aria-label="主导航">
          <NavLink href="/projects">项目</NavLink>
          <NavLink href="/about">关于</NavLink>
          <NavLink href="/#contact">联系</NavLink>
        </nav>
        <div className="flex items-center gap-2">
          <ThemeSwitch />
          <a className="hidden h-10 items-center gap-2 rounded-[10px] bg-zinc-950 px-4 text-sm font-medium text-white shadow-sm transition-all duration-250 hover:-translate-y-0.5 hover:bg-zinc-800 hover:shadow-md sm:inline-flex dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200" href={`${basePath}/#contact`}>
            开始交流
          </a>
          <MobileMenu>
            <NavLink href="/projects">项目</NavLink>
            <NavLink href="/about">关于</NavLink>
            <NavLink href="/#contact">联系</NavLink>
          </MobileMenu>
        </div>
      </div>
    </header>
  );
}
