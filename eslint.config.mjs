import nextPlugin from "@next/eslint-plugin-next";
import js from "@eslint/js";

// 用 @next/eslint-plugin-next 直接提供的 flat config preset，避开
// next/core-web-vitals 这个 legacy 兼容层在 FlatCompat 下报的 circular 结构错。
const nextConfig = nextPlugin.configs["core-web-vitals"];

export default [
  {
    ignores: ["out/**", ".next/**", "public/**", "content/**", "node_modules/**"],
  },
  js.configs.recommended,
  nextConfig,
];