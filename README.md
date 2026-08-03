# 静态项目导航仓

双击 `index.html` 即可打开导航首页，无需启动 Node.js。首页默认浅色主题，右上角可切换深色主题；每个项目卡片应维护：名称、类型、状态、更新时间、摘要、封面资源和链接。

## 新增项目

1. 将可直接运行的静态成品放到 `<项目名>/`，与首页 `index.html` 同级。
2. 运行 `node static-project-hub/scripts/generate-projects.mjs` 自动更新首页卡片。
3. Next.js 项目先执行静态导出，再复制其 `out/` 内容到对应项目目录；项目内返回首页统一使用 `../index.html`。

每个项目应提供 `meta.json` 与 `cover.png`。封面使用项目首页截图即可；本仓库不再依赖浏览器自动截图，确保双击 `index.html` 与项目管理脚本均无需安装依赖。

## 检查与更新

```powershell
node scripts/capture-covers.mjs
node scripts/generate-projects.mjs
```

前一条检查项目封面是否齐全，后一条自动更新首页项目卡片。

当前仅链接到仓库中已有的中国传统色成品，未复制、删除或修改该项目。
