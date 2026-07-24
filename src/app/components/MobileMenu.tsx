"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";

interface MobileMenuProps {
  children: React.ReactNode;
}

/** 移动端导航：把原生 <details> 改为受控按钮 + 弹层，键盘 Enter/Space 都能切换。 */
export function MobileMenu({ children }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onPointer(event: PointerEvent) {
      if (wrapRef.current && !wrapRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={wrapRef} className="relative md:hidden">
      <button
        type="button"
        aria-label={open ? "关闭导航" : "打开导航"}
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen((state) => !state)}
        className="flex size-10 cursor-pointer items-center justify-center rounded-[10px] border border-zinc-200 bg-white text-zinc-700 transition-all duration-250 hover:bg-zinc-100 dark:border-white/10 dark:bg-white/5 dark:text-white"
      >
        {open ? <X aria-hidden="true" focusable="false" size={18} /> : <Menu aria-hidden="true" focusable="false" size={18} />}
      </button>
      {open ? (
        <nav
          id="mobile-nav"
          aria-label="移动导航"
          className="absolute right-0 top-12 w-32 rounded-[10px] border border-zinc-200 bg-white p-2 shadow-lg dark:border-white/10 dark:bg-zinc-900"
        >
          <div className="flex flex-col gap-1" onClick={() => setOpen(false)}>
            {children}
          </div>
        </nav>
      ) : null}
    </div>
  );
}
