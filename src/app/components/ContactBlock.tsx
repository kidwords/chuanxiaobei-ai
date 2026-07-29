import { GitFork, ExternalLink } from "lucide-react";
import { Icon } from "./Icon";

export function ContactBlock() {
  return (
    <section id="contact" className="relative isolate overflow-hidden border-t border-zinc-200 bg-zinc-100 px-4 py-12 text-zinc-950 dark:border-white/10 dark:bg-zinc-950 dark:text-white sm:px-6 sm:py-16">
      <div className="ambient-orb ambient-orb-blue -right-28 -top-32 size-72 sm:size-96" aria-hidden="true" />
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col justify-between gap-8 lg:flex-row lg:items-end">
        <div>
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">联系</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-semibold leading-[1.3] sm:text-4xl">通过 GitHub，关注正在发生的项目。</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          <a className="inline-flex h-11 items-center gap-2 rounded-[10px] bg-zinc-950 px-5 text-sm font-medium text-white shadow-sm transition-all duration-250 hover:-translate-y-0.5 hover:bg-zinc-800 hover:shadow-md dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200" href="https://github.com/kidwords" target="_blank" rel="noreferrer">
            <Icon size={16}>{GitFork}</Icon> GitHub 主页 <Icon size={14}>{ExternalLink}</Icon>
          </a>
        </div>
      </div>
    </section>
  );
}
