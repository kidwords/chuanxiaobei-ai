# 已完成

- 24 节气混色现状诊断（scripts/analyze-blend.mjs）：现方案为双色 135° 直线渐变，16/24 节气两端色相差 >60°，其中 8 个接近互补色（渐变中段出灰带）；清明两端均低饱和
- 混色方案评审稿 previews/blend-proposals.html：3 套方案 × 24 节气，全部色点取自本节气十六色（脚本自动校验），headless 截图逐季验证通过
- README.md 重写：补全项目由来、当前 2 个项目（chinese-traditional-colors / html_ui-ux-pro-max）的简介与入口、首次使用流程、新增/维护/Next.js 接入步骤，修正原 README 里失效的 `static-project-hub/scripts/...` 路径
- 接入「二十种 UI 风格实验」：新增 `html_ui-ux-pro-max/`（20 套独立风格 + Bento / 新拟态两套 showcase）、`cover.png`、`meta.json`；`scripts/generate-projects.mjs` 支持 `meta.entry` 覆盖卡片入口；首页卡片与 README 同步
- 色卡排序修复：「全部浏览」页默认色不再单独置顶，改为同色阶整组上移，首行恢复为 天缥 / 沧浪 / 苍筤 / 缥碧（`getGalleryDisplayColorRecords`）
- 首屏性能修复：42 个页面外链字体改非阻塞、风格总览页去外链字体改系统字体栈、背景 `blur(120px)` 光晕改静态径向渐变、卡片入场错峰压缩；复测 DCL 51ms / load 63ms / 长任务 267ms → 0
