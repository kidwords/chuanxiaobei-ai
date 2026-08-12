# 中国传统色

这是一个可以直接打开使用的中国传统色彩浏览工具。它把传统色整理成容易浏览、复制和使用的颜色卡片，适合做网页、海报、插画、品牌和 AI 提示词配色参考。

## 先看项目是什么

### 项目来源

项目色彩资料参考《中国传统色：故宫里的色彩美学》。原书由郭浩、李健明编撰，从故宫建筑、传统服饰、古画典籍等资料中整理传统色名与色值。

本项目将其中的 384 种颜色按四季和二十四节气重新编排，每个节气提供 16 种颜色，并补充浅色模式、深色模式、配色提示词和节气动效。

### 项目包含什么

- **首页**：按春、夏、秋、冬展示 24 个节气色卡，点击色块即可切换背景。
- **逐步览色**：像翻阅画册一样逐个查看场景配色和通用配色。
- **全部浏览**：一次查看完整的场景配色与节气配色，适合快速对比。
- **配色板**：自由选择颜色、调整混色方向，探索自己的背景方案。
- **节气动效**：首页会根据当前节气显示对应的粒子效果；不喜欢动效时可以关闭。
- **保存背景**：把当前看到的背景保存为图片，便于做参考或分享。

## 在线预览

- [打开中国传统色在线版](https://kidwords.github.io/chuanxiaobei-ai/chinese-traditional-colors/index.html)
- [查看 GitHub 仓库](https://github.com/kidwords/chinese-traditional-colors)

在线版不需要安装任何软件，打开链接后直接点击色卡即可使用。

## 普通用户怎么使用

1. 在首页点击任意节气色卡，查看该节气的完整 16 色。
2. 点击单个小色块，可以把页面切换成单色背景。
3. 点击色卡上方的混色区域，可以查看该节气的组合背景。
4. 想看更多方案时，打开“逐步览色”或“全部浏览”。
5. 想自己搭配时，打开“配色板”，选择颜色并调整混色方向。
6. 需要图片时，点击“保存背景”。
7. 如果页面在手机或平板上卡顿，可以点击“关闭动效”；颜色浏览和配色功能不会受影响。

## 本地打开

这个项目是纯静态网页，不需要安装 Node.js，也不需要启动服务器。

### 最简单的方法

1. 下载或复制 `chinese-traditional-colors` 文件夹。
2. 打开文件夹。
3. 双击其中的 `index.html`。
4. 浏览器打开后即可使用。

建议把整个文件夹一起复制，不要只复制 `index.html`，这样封面、返回链接和后续资源都能保持完整。

### 如果浏览器限制本地文件

少数浏览器会限制本地文件的部分功能。此时可以把该文件夹放到任意静态文件服务器，或者使用编辑器提供的“本地预览”功能。项目本身没有后端服务，也不会上传用户选择的颜色。

## 复制到自己的网站

### 直接作为一个页面使用

1. 复制整个 `chinese-traditional-colors` 文件夹到自己网站的静态目录。
2. 确认文件夹内保留 `index.html`、`cover.png` 和 `cover.svg`。
3. 通过网站地址访问：

   `https://你的网站地址/chinese-traditional-colors/index.html`

### 作为网站首页使用

如果想让它成为网站根首页，可以把文件夹内的 `index.html` 复制到网站根目录，并同时复制相关资源。若保留原目录结构，建议直接上传整个文件夹，这样页面中的“返回总览”链接不会失效。

### 作为 iframe 嵌入

如果只是想在已有网站中展示，可以嵌入在线页面：

```html
<iframe
  src="https://kidwords.github.io/chuanxiaobei-ai/chinese-traditional-colors/index.html"
  title="中国传统色"
  style="width:100%;min-height:900px;border:0;border-radius:16px;"
  loading="lazy"
></iframe>
```

## 维护者说明

### 项目目录

```text
chinese-traditional-colors/
├─ index.html                 # 项目唯一入口，页面、样式和脚本都在这里
├─ cover.png                  # 项目封面
├─ cover.svg                  # 矢量封面，可选
├─ meta.json                  # 仓库首页使用的项目简介
├─ LICENSE                   # Apache-2.0 许可证
└─ docs/
   ├─ 颜色整理.txt            # 384 色资料与 AI 使用模板
   └─ future-weather-effects.md # 暂不启用的天气方案记录
```

当前项目刻意保持单文件，便于双击打开、离线分享和复制到其他网站。修改页面时，优先在 `index.html` 内完成，不要随意拆分资源，否则可能影响 `file://` 本地打开。

### 仓库总览维护命令

以下命令需要在仓库根目录 `D:\kidwords\chuanxiaobei-ai` 中执行：

```powershell
# 检查项目封面是否齐全
node scripts/capture-covers.mjs

# 扫描各项目的 meta.json，重新生成仓库根目录项目卡片
node scripts/generate-projects.mjs
```

新增一个同类项目时：

```text
新项目名/
├─ index.html
├─ meta.json
└─ cover.png
```

然后运行 `node scripts/generate-projects.mjs`，根目录首页就会出现新项目卡片。这个项目没有 `npm install`、打包或构建依赖；Node.js 只用于维护仓库总览脚本。

### 修改后检查

- 双击 `chinese-traditional-colors/index.html`，确认页面可以打开。
- 点击首页单色、混色、逐步览色、全部浏览和配色板入口。
- 在手机或平板上确认页面可以滚动，必要时测试关闭动效。
- 修改项目简介后，检查 `meta.json` 的 JSON 格式是否正确。

## 版权与使用提醒

代码以 Apache-2.0 许可证发布，具体以 [LICENSE](./LICENSE) 为准。颜色名称和传统色资料来自公开出版物整理，若用于商业项目，请自行确认资料引用、字体和图片素材的授权范围。

