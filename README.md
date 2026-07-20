# 川小北AI

面向 GitHub Pages 的个人 AI 项目展示静态站。

## 本地运行

```powershell
npm install
npm run dev
```

## 发布到 GitHub Pages

1. 新建 GitHub 仓库并推送本项目。
2. 在仓库的 `Settings > Pages` 中，将 Source 选择为 `GitHub Actions`。
3. 推送到 `main` 分支后，工作流会自动构建并发布。

对于项目仓库，工作流会自动使用仓库名作为路径前缀；对于 `用户名.github.io` 仓库，则自动发布在根路径。

公开项目内容目前集中在 `src/app/page.tsx` 的 `openSourceProjects` 数组中，可按需替换标题、说明、标签、封面图、GitHub 链接和在线演示链接。
