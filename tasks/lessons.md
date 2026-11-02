# 教训

- chinese-traditional-colors/index.html 是 CRLF 换行：正则要写 `\r?\n`，否则匹配失败
- SOLAR_16_COLORS / SOLAR_BLEND_OVERRIDES 是无引号键的 JS 字面量：JSON.parse 会失败，用 `new Function('return ...')()` 求值
- SOLAR_SCENES 是单行超长 JSON：提取用花括号平衡匹配，勿用惰性正则（会吞掉相邻的 SCENES 对象）
- headless 截图锚点滚动不可靠（截图空白）：给页面加 `?only=春` 参数单季渲染绕开
- 本环境 Playwright MCP 启动 Chrome 报 spawn UNKNOWN：改用 Edge headless（`msedge.exe --headless=new --screenshot`）截图
- Google Fonts 的 `<link rel="stylesheet">` 是渲染阻塞资源：内地网络请求超时时整页白屏（连 body 末尾的内联脚本都会等它），静态页一律改 `<link ... media="print" onload="this.media='all'">` 或直接用系统字体栈
- `filter: blur(120px)` 的大面积光晕即使静止也吃 GPU（软件渲染下掉帧更明显），静态观感用 `radial-gradient` 替代；20 张卡片按 `i*30ms` 错峰入场会让首屏「看着像空的」，错峰总量压在 150ms 内
- 用 CDP 量首屏要 `Page.addScriptToEvaluateOnNewDocument` 注入探针，navigate 后再 `Runtime.evaluate` 会落在旧文档上，测得一串 0
