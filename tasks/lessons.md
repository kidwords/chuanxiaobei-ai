# 教训

- chinese-traditional-colors/index.html 是 CRLF 换行：正则要写 `\r?\n`，否则匹配失败
- SOLAR_16_COLORS / SOLAR_BLEND_OVERRIDES 是无引号键的 JS 字面量：JSON.parse 会失败，用 `new Function('return ...')()` 求值
- SOLAR_SCENES 是单行超长 JSON：提取用花括号平衡匹配，勿用惰性正则（会吞掉相邻的 SCENES 对象）
- headless 截图锚点滚动不可靠（截图空白）：给页面加 `?only=春` 参数单季渲染绕开
- 本环境 Playwright MCP 启动 Chrome 报 spawn UNKNOWN：改用 Edge headless（`msedge.exe --headless=new --screenshot`）截图
