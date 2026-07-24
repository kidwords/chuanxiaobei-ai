# 川小北AI 展示站

GitHub Pages 静态部署：https://kidwords.github.io/chuanxiaobei-ai/

## 目录结构

```
content/
  projects/<slug>.mdx     # 单个项目档案的 frontmatter + 正文
public/
  projects/<slug>/cover.svg # 项目封面（可替换成 PNG / WebP / AVIF）
src/
  app/
    layout.tsx           # 全局外壳、head JSON-LD Person、主题预同步脚本
    page.tsx             # 首页
    projects/page.tsx    # 项目档案列表
    projects/[slug]/page.tsx # 单个项目
    about/page.tsx       # 关于
    sitemap.ts           # 自动汇总页面与项目
    feed.xml/route.ts    # RSS
    not-found.tsx        # 404
    global-error.tsx     # 全局错误兜底
  components/            # 共享部件：SiteHeader、Footer、Hero、ProjectGrid、Icon、ThemeSwitch 等
lib/                     # 数据访问 (projects.data.ts) 与 SEO 工具
.eslint.config.mjs       # flat config：@eslint/js recommended + @next/eslint-plugin-next core-web-vitals
```

## 新增一个项目

1. 在 `content/projects/<slug>.mdx` 创建文件，frontmatter 至少包含：

   ```yaml
   ---
   title: "项目名"
   summary: "一段话简介"
   repository: "owner/repo"
   tags: ["HTML", "Apache-2.0"]
   license: "Apache-2.0"
   status: "stable"
   createdAt: "2025-12-01"
   updatedAt: "2026-07-24"
   github: "https://github.com/owner/repo"
   demo: "https://example.com/"
   artwork: "/projects/<slug>/cover.svg"
   ---

   # 用 Markdown 写正文
   ```

2. 把封面资源放到 `public/projects/<slug>/cover.svg`（任意浏览器可加载的图片格式均可）。

3. 提交后推 `main`，GitHub Actions 会自动发布。

4. `sitemap.xml` 与 `feed.xml` 会在构建时自动把新增项目写入。

## 本地开发

```
npm install
NEXT_PUBLIC_BASE_PATH=/chuanxiaobei-ai npm run dev
NEXT_PUBLIC_BASE_PATH=/chuanxiaobei-ai npm run build && npm start
NEXT_PUBLIC_BASE_PATH=/chuanxiaobei-ai npm run lint
npm run typecheck
npm run verify   # lint + typecheck
```

如果本地没有 `BASE_PATH`，构建仍能完成，但相对资源路径会回到站点根。