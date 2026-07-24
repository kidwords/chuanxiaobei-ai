"use client";

import { useCallback, useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

const STORAGE_KEY = "theme";
type Theme = "light" | "dark";

function readDocumentTheme(): Theme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

let currentTheme: Theme = typeof document !== "undefined" ? readDocumentTheme() : "light";

function subscribe(notify: () => void) {
  if (typeof document === "undefined") return () => undefined;
  const observer = new MutationObserver(notify);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  window.addEventListener("storage", (event) => {
    if (event.key === STORAGE_KEY) notify();
  });
  return () => observer.disconnect();
}

function getSnapshot(): Theme {
  currentTheme = readDocumentTheme();
  return currentTheme;
}

function getServerSnapshot(): Theme {
  return "light";
}

export function ThemeSwitch() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = useCallback(() => {
    const next: Theme = currentTheme === "dark" ? "light" : "dark";
    const root = document.documentElement;
    if (next === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* 忽略存储错误 */
    }
  }, []);

  return (
    <button
      type="button"
      role="switch"
      aria-label="切换深色模式"
      aria-checked={theme === "dark"}
      onClick={toggle}
      className="flex size-10 cursor-pointer items-center justify-center rounded-[10px] border border-zinc-200 bg-white text-zinc-700 shadow-sm transition-all duration-250 hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md dark:border-white/10 dark:bg-white/5 dark:text-zinc-200"
    >
      {theme === "dark" ? (
        <Sun aria-hidden="true" focusable="false" size={17} />
      ) : (
        <Moon aria-hidden="true" focusable="false" size={17} />
      )}
    </button>
  );
}
