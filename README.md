# kidwords · AI 项目与产品实践

一个**纯静态**的项目导航仓，集中存放 kidwords 个人在 AI 主题下沉淀的 HTML 成品。**双击仓库根目录的 `index.html` 即可打开导航首页**，无需安装 Node.js、依赖或构建工具。

## 由来

- **为什么是「静态仓」**：本仓库收录的成品都是单文件或纯前端项目（纯 HTML / 纯静态资源），双击即开、复制即用，便于在不同设备、邮件附件、离线环境里直接展示。
- **为什么首页不是「项目列表」而是「导航仓」**：所有项目在仓库同级平行存在，目录名即 slug；首页通过 `scripts/generate-projects.mjs` 自动扫描子目录的 `meta.json` 生成卡片。新增项目只需丢一个目录进来，再跑一次脚本，零模板、零拷贝。
- **为什么不用 `static-project-hub/scripts/...`**：原 README 提到的 `static-project-hub` 子目录已下线；脚本统一迁到仓库根的 `scripts/`。

## 现有项目

| 目录 | 标题 | 来源 | 简介 | 入口 |
|---|---|---|---|---|
| [`chinese-traditional-colors/`](./chinese-traditional-colors/) | 中国传统色 | [kidwords/chinese-traditional-colors](https://github.com/kidwords/chinese-traditional-colors)（Apache-2.0） | 整理《中华传统色：故宫里的色彩美学》完整 384 色，按 24 节气与 72 物候编排，附标准 Hex 色值、AI 配色提示词、浅深双模式与节气专属动效。 | [立即打开](./chinese-traditional-colors/index.html) |
| [`showcase-neumorphism/`](./showcase-neumorphism/) | 新拟态深度探索 | 本地静态示例 | 10 个新拟态（Neumorphism）界面示例，以柔和阴影、内外凹凸层次与可交互评分展示拟物风格的可读性与局限。 | [立即打开](./showcase-neumorphism/index.html) |

每个项目目录都遵循同一约定，便于被首页自动识别：

- `index.html` — 项目首页（双击运行）
- `meta.json` — 卡片元数据（title / summary / repository / license / tags / github）
- `cover.png` — 卡片封面（首页截图即可，可选 `cover.svg`）

## 快速上手

### 给第一次使用的人

如果你只是想看看颜色或找一组配色，不需要安装软件：

1. 打开[中国传统色在线版](https://kidwords.github.io/chuanxiaobei-ai/chinese-traditional-colors/index.html)。
2. 点击节气色卡查看 16 色，点击小色块切换单色背景。
3. 点击混色区域查看节气组合背景，需要自己搭配时进入“配色板”。
4. 页面在手机或平板上卡顿时，可以关闭首页动效，配色功能仍然可以使用。

想了解这个项目的来源、页面功能、本地打开和复制到自己网站的方法，请看[中国传统色项目说明](./chinese-traditional-colors/README.md)。

### 1. 看一眼（无需安装）

直接双击仓库根目录的 [`index.html`](./index.html)，浏览器里就能看到所有项目卡片。

**或者直接打开线上版：**

- [中国传统色](https://kidwords.github.io/chuanxiaobei-ai/chinese-traditional-colors/index.html)
- [新拟态深度探索](https://kidwords.github.io/chuanxiaobei-ai/showcase-neumorphism/index.html)

### 2. 跑项目

进任意项目目录双击对应 `index.html`。两个项目都是纯静态、纯前端、零依赖。

### 3. 维护项目

| 想做的事 | 命令 / 操作 |
|---|---|
| 新增项目 | 在仓库根新建 `<项目名>/` 目录，按上面的约定准备 `index.html` + `meta.json` + `cover.png` |
| 检查封面是否齐全 | `node scripts/capture-covers.mjs`（缺封面会 `exit 1`） |
| 重新生成首页项目卡片 | `node scripts/generate-projects.mjs`（脚本会替换 `index.html` 中 `<!-- PROJECTS:START --> ... <!-- PROJECTS:END -->` 之间的内容） |

> Node.js 仅用于维护脚本；项目本身仍是纯静态，不会因为 Node 升级或缺失而出问题。

### 4. Next.js 等需要构建的项目如何接入

原项目若需 `next export` 等构建步骤，先构建并把产物（`out/` 或 `dist/`）原样复制到 `<项目名>/`，然后按上述约定补 `meta.json` 和 `cover.png`，最后跑 `node scripts/generate-projects.mjs`。项目内的"返回首页"链接统一用 `../index.html`。

## 维护小贴士

- 首页右上角可切换浅 / 深色主题（沿用仓库根 `index.html` 自带的 `data-theme` 切换逻辑）。
- 项目卡片标题、摘要、标签均来自 `meta.json`；README 不参与首页渲染，改动不会影响线上卡片。
- 截图前可手动打开项目首页 → 调整到合适尺寸 → 用浏览器或系统截图工具保存为 `cover.png`，再跑 `generate-projects.mjs`。
