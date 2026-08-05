import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const pagePath = new URL('../chinese-traditional-colors/index.html', import.meta.url);
const page = (await readFile(pagePath, 'utf8')).replace(/\r\n/g, '\n');
const inlineScript = /<script>([\s\S]*?)<\/script>\s*<\/body>/.exec(page)?.[1] ?? '';
const utils = inlineScript;
const solarData = inlineScript;
const paletteRenderer = inlineScript;

function readInlineObject(sourceText, variableName, endMarker) {
  const declaration = `var ${variableName} = `;
  const start = sourceText.indexOf(declaration);
  const end = endMarker ? sourceText.indexOf(endMarker, start) : sourceText.length;
  assert.notEqual(start, -1, `找不到 ${variableName} 声明`);
  assert.notEqual(end, -1, `找不到 ${variableName} 结束标记`);
  const source = sourceText.slice(start + declaration.length, end).trim().replace(/;$/, '');
  return Function(`return (${source});`)();
}

test('沉浸式键盘导航不拦截 Tab 键', () => {
  assert.doesNotMatch(page, /e\.key === ' ' \|\| e\.key === 'Tab'/);
  assert.match(page, /if \(e\.key === ' '\) \{ e\.preventDefault\(\); toggleMode\(\); \}/);
});

test('动态选色控件提供按钮语义和可读文字计算', () => {
  assert.match(page, /dot = document\.createElement\('button'\)/);
  assert.match(page, /class="imm-swatch" aria-label=/);
  assert.match(utils, /function getRelativeLuminance\(/);
  assert.match(utils, /function getReadableTextColor\(/);
});

test('减少动态效果偏好覆盖全部页面动效', () => {
  assert.match(page, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(page, /animation-duration: 0\.01ms !important/);
});

test('首页动效可由用户关闭并记住选择', () => {
  assert.match(page, /id="homeMotionToggle"[^>]*onclick="toggleHomeMotion\(\)"/);
  assert.match(page, /body\[data-home-motion="off"\] \.home-reference-leaf-layer \{ display: none; \}/);
  assert.match(inlineScript, /var HOME_MOTION_STORAGE_KEY = 'chinese-traditional-colors\.home-motion-enabled';/);
  assert.match(inlineScript, /function readHomeMotionPreference\(\)/);
  assert.match(inlineScript, /window\.localStorage\.getItem\(HOME_MOTION_STORAGE_KEY\)/);
  assert.match(inlineScript, /function updateHomeMotionUi\(\)/);
  assert.match(inlineScript, /function toggleHomeMotion\(\)/);
  assert.match(inlineScript, /window\.localStorage\.setItem\(HOME_MOTION_STORAGE_KEY, homeMotionEnabled \? 'true' : 'false'\)/);
  assert.match(inlineScript, /homeSolarEffectActive \|\| currentView !== 'home' \|\| !homeMotionEnabled \|\| prefersReducedMotion\(\)/);
  assert.match(inlineScript, /stopHomeSolarEffect\(true\)/);
});

test('移动端不使用 fixed 背景，并为安全区域和触控尺寸留出空间', () => {
  assert.match(page, /\.gallery-fixed-background \{ background-attachment: scroll !important; \}/);
  assert.match(page, /env\(safe-area-inset-bottom\)/);
  assert.match(page, /min-height: 44px/);
  assert.match(page, /max-height: min\(45dvh, 420px\)/);
});

test('所有视图复用统一的混色方案计算', () => {
  assert.doesNotMatch(page, /<script src="assets\//);
  assert.match(inlineScript, /=== 色彩工具 ===/);
  assert.match(utils, /function getBlendSpec\(colors, direction\)/);
  assert.match(utils, /function chooseHarmoniousPair\(colors\)/);
  assert.match(utils, /var hueScore = hueDistance <= 90/);
  assert.doesNotMatch(page, /linear-gradient\(135deg,' \+ colors\[0\]\.hex \+ ',' \+ colors\[4\]\.hex/);
  assert.match(page, /var blendBg = blend\.gradient/);
});

test('背景预览通过公共方法更新，避免各页面状态分叉', () => {
  assert.match(utils, /function setPageBackground\(value, size\)/);
  assert.match(utils, /function setHomeBackground\(value, textHex\)/);
  assert.match(utils, /function setPaletteBackground\(value\)/);
  assert.match(paletteRenderer, /setPaletteBackground\('linear-gradient/);
  assert.match(page, /onclick="applyHomeSolarEffect/);
  assert.match(page, /function previewScene[\s\S]*?setPageBackground\(gradient\)/);
  assert.match(page, /body \{[\s\S]*?transition: background 0\.8s ease, background-color 0\.8s ease;/);
  assert.match(page, /#palBgLayer \{ transition: background 0\.8s ease, opacity 0\.8s ease; \}/);
});

test('背景导出跟随当前视图，并保留渐变方向和辐射中心', () => {
  assert.match(page, /function getExportBackgroundSource\(\)/);
  assert.match(page, /currentView === 'home'[\s\S]*?getElementById\('homeBg'\)/);
  assert.match(page, /currentView === 'immersive' && immCurrentTab === 'palette'[\s\S]*?getElementById\('palBgLayer'\)/);
  assert.match(page, /to top right[\s\S]*?return 45/);
  assert.match(page, /to top left[\s\S]*?return 315/);
  assert.match(page, /keywordPosition = match\[3\]\.match/);
  assert.match(page, /function saveBackgroundAsImage\(mode\)[\s\S]*?paintExportBackground\(ctx, canvas\.width, canvas\.height, getExportBackgroundSource\(\)\)/);
});

test('配色板重置会恢复默认渐变方向', () => {
  assert.match(page, /function resetPalette\(\)[\s\S]*?palDirectionIdx = 3/);
  assert.match(page, /dirBtn\.textContent = PAL_GRADIENTS\[palDirectionIdx\]\.label/);
});

test('首页只使用原始优选混色，十六色保留给单色展示', () => {
  assert.match(page, /function getSolarBlend\(name, mode\)/);
  assert.match(page, /var scheme = SOLAR_SCENES\[name\] && SOLAR_SCENES\[name\]\[mode \|\| 'light'\]/);
  assert.match(page, /function getHomeBlend\(name\)/);
  assert.match(page, /return getSolarBlend\(name, 'light'\)/);
  assert.doesNotMatch(page, /function cycleHomeBlend\(name\)/);
  assert.doesNotMatch(page, /homeBlendIndexes/);
});

test('配色板节气卡复用首页的优选混色', () => {
  assert.match(inlineScript, /=== 配色板渲染 ===/);
  const paletteCards = paletteRenderer.match(/function renderPalAllColors\(\)[\s\S]*?\n}\n\nfunction togglePalColor/)[0];
  assert.match(paletteCards, /var blend = getHomeBlend\(name\);/);
  assert.match(paletteCards, /applySolarTermPalette/);
  assert.doesNotMatch(paletteCards, /var blend = getBlendSpec\(colors\);/);
  assert.match(page, /function renderPalAllColors\(\)/);
  assert.match(inlineScript, /function applySolarTermPalette\(name\)/);
});

test('全部浏览节气卡按当前浅深模式复用同一混色来源', () => {
  const gallerySolar = page.match(/function renderSolarSectionsInGallery\(\)[\s\S]*?\n}\s*function toggleSolarCardMode/)[0];
  assert.match(gallerySolar, /var blend = getSolarBlend\(name, mode\);/);
  assert.match(gallerySolar, /var gradient = blend\.gradient/);
  assert.match(gallerySolar, /paletteRowMarkup\(colors\[c\], 'setPageBackground/);
  assert.doesNotMatch(gallerySolar, /document\.body\.style\.background/);
});

test('配色板选色只更新对应色块，不重建全部网格', () => {
  assert.match(paletteRenderer, /data-palette-hex="' \+ c\.hex \+ '"/);
  assert.match(paletteRenderer, /function updatePalColorSelection\(hex, isSelected\)/);
  assert.match(paletteRenderer, /document\.querySelectorAll\(selector\)/);
  const toggle = paletteRenderer.match(/function togglePalColor\([\s\S]*?\n}\n\nfunction updatePalColorSelection/)[0];
  assert.doesNotMatch(toggle, /renderPalAllColors\(\)/);
  assert.match(toggle, /updatePalColorSelection\(hex, isSelected\)/);
});

test('标题流光使用亮度受控的精选颜色并保证首尾无缝', () => {
  assert.match(page, /var curatedStops = stops\.filter/);
  assert.match(page, /luma >= 58 && luma <= 208/);
  assert.match(page, /var maxStops = 64/);
  assert.match(page, /curatedStops\.push\(curatedStops\[0\]\)/);
});

test('节气方案数据完整，首页十六色与推荐方案保持职责分离', () => {
  const rawColors = readInlineObject(solarData, 'SOLAR_16_COLORS', 'var SOLAR_SCENES = ');
  const scenes = readInlineObject(solarData, 'SOLAR_SCENES', '// === 配色板渲染 ===');
  const expectedRoles = ['accent', 'accent2', 'bg', 'ink', 'surface'];

  assert.match(inlineScript, /=== 节气数据 ===/);
  assert.match(page, /var SOLAR_16_COLORS = /);
  assert.equal(Object.keys(scenes).length, 24);
  assert.deepEqual(Object.keys(rawColors).sort(), Object.keys(scenes).sort());
  for (const [name, scene] of Object.entries(scenes)) {
    assert.equal(rawColors[name].length, 16, `${name} 首页应保留十六个原始单色`);
    for (const mode of ['light', 'dark']) {
      const colors = scene[mode].colors;
      assert.equal(colors.length, 5, `${name} ${mode} 推荐方案应包含五个角色色`);
      assert.deepEqual(colors.map((color) => color.role).sort(), expectedRoles);
      assert.ok(colors.every((color) => /^#[0-9A-F]{6}$/.test(color.hex)), `${name} ${mode} 色值格式错误`);
    }
  }
});

test('总览和配色板卡片支持键盘访问，且颜色选择有明确状态', () => {
  assert.match(page, /class="solar-card-blend" aria-label="应用' \+ name \+ '混色背景"/);
  assert.match(paletteRenderer, /class="pal-card-blend"/);
  assert.match(paletteRenderer, /class="pal-c' \+ \(isSelected \? ' sel' : ''\) \+ '"/);
  assert.match(paletteRenderer, /aria-pressed="' \+ isSelected \+ '"/);
  assert.match(page, /class="solar-blend" aria-label="应用' \+ name \+ '混色背景/);
});

test('首页节气卡与说明框外边界对齐，桌面端每行六张', () => {
  assert.match(page, /\.solar-grid \{ display: grid; grid-template-columns: repeat\(6, minmax\(0, 1fr\)\); gap: 8px; max-width: 936px; margin-inline: auto; \}/);
  assert.match(page, /\.solar-grid \{ grid-template-columns: repeat\(3, 1fr\); gap: 8px; max-width: none; margin-inline: 0; \}/);
});

test('配色板节气卡与首页采用同一桌面卡片宽度', () => {
  assert.match(page, /id="immPalette" style="[^"]*width:min\(936px,calc\(100vw - 32px\)\)/);
  assert.match(page, /#palAllColors\.pal-grid-mode \{ display: grid; grid-template-columns: repeat\(6, minmax\(0, 1fr\)\); gap: 8px;/);
});

test('首页按二十四节气匹配独立下落动效，并由混色按钮切换', () => {
  const rawColors = readInlineObject(solarData, 'SOLAR_16_COLORS', 'var SOLAR_SCENES = ');
  const effects = readInlineObject(inlineScript, 'HOME_SOLAR_EFFECTS', 'var HOME_TERM_FALLING = ');
  const falling = readInlineObject(inlineScript, 'HOME_TERM_FALLING', 'var HOME_FALLING_INTENSITY = ');
  assert.deepEqual(Object.keys(effects).sort(), Object.keys(rawColors).sort());
  assert.deepEqual(Object.keys(falling).sort(), Object.keys(rawColors).sort());
  assert.ok(Object.values(effects).every((effect) => effect.motion), '每个节气必须定义独立运动轨迹');
  assert.ok(Object.values(falling).every((effect) => effect.type && effect.count > 0 && effect.speed >= 0 && ['light', 'medium', 'heavy'].includes(effect.intensity)), '每个节气必须定义下落类型、数量、速度和强度');
  const expectedTypes = {
    '立春': 'bud', '雨水': 'rain', '惊蛰': 'petal', '春分': 'petal', '清明': 'leaf', '谷雨': 'rain',
    '立夏': 'leaf', '小满': 'wheat', '芒种': 'wheat', '夏至': 'sun', '小暑': 'heat', '大暑': 'firefly',
    '立秋': 'leaf', '处暑': 'leaf', '白露': 'dew', '秋分': 'leaf', '寒露': 'leaf', '霜降': 'leaf',
    '立冬': 'snow', '小雪': 'snow', '大雪': 'snow', '冬至': 'snow', '小寒': 'snow', '大寒': 'snow'
  };
  for (const [name, type] of Object.entries(expectedTypes)) assert.equal(falling[name].type, type, `${name} 动效类型不匹配`);
  assert.doesNotMatch(page, /solar-effect-controls|previewHomeSolarEffect|resetHomeSolarEffect/);
  assert.doesNotMatch(page, /id="seasonCycleStatus"/);
  assert.match(inlineScript, /var HOME_REFERENCE_LEAF_MAX = 150;/);
  assert.match(inlineScript, /var HOME_REFERENCE_DEVICE_BUDGET = \{ mobile: 34, tablet: 58, desktop: 96 \}/);
  assert.match(inlineScript, /var HOME_FALLING_INTENSITY = \{/);
  assert.match(inlineScript, /var density = profile\.density \* \(config\.type === 'rain' \? 1\.2 : 1\)/);
  assert.match(inlineScript, /var HOME_REFERENCE_LEAF_CHARS = \['❀', '✿', '❋', '🍃', '🌿', '🍂'\]/);
  assert.match(inlineScript, /function spawnHomeReferenceLeaves\(colors, termName\)/);
  assert.match(inlineScript, /function startHomeReferenceLeaves\(colors, termName\)/);
  assert.match(inlineScript, /HOME_TERM_FALLING\[termName\]/);
  assert.match(inlineScript, /var lane = amount > 1 \? \(\(index \+ 0\.5\) \/ amount \+ rainLaneOffset\) % 1 : 0\.5/);
  assert.match(inlineScript, /var xPercent = Math\.max\(1\.5, Math\.min\(98\.5, \(lane \+ jitter\) \* 100\)\)/);
  assert.match(inlineScript, /leaf\.style\.setProperty\('--reference-leaf-delay', \(Math\.random\(\) \* Math\.min\(speed \* 0\.18, 1\.6\)\)/);
  assert.match(inlineScript, /solar-card-blend[\s\S]*?applyHomeSolarEffect/);
  assert.doesNotMatch(inlineScript, /function spawnHomeSeasonFall\(/);
  assert.match(inlineScript, /function startHomeSolarEffect\(\)/);
  assert.match(page, /updateHomeTextColors\(_initColors\[0\]\.hex\);\s*updateHomeMotionUi\(\);\s*startHomeSolarEffect\(\);\s*<\/script>/);
  assert.match(inlineScript, /if \(name !== 'home'\) stopHomeSolarEffect\(\);/);
  assert.doesNotMatch(inlineScript, /function updateHomeSolarEffectUi\(/);
  assert.match(inlineScript, /if \(prefersReducedMotion\(\) \|\| !homeMotionEnabled\) return;/);
  assert.match(page, /\.home-reference-leaf-layer \{ display: none; \}/);
});

test('雨水雨幕使用青绿色、完整下落和均匀分区生成', () => {
  assert.match(inlineScript, /'雨水': \{ type: 'rain', emoji: \['💧'\], count: 150, speed: 8\.8, intensity: 'medium' \}/);
  assert.match(inlineScript, /'雨水': \['#AFC9D3', '#6F9CAF', '#3E6E82'\]/);
  assert.match(inlineScript, /'谷雨': \{ type: 'rain', emoji: \['💧'\], count: 132, speed: 8\.2, intensity: 'heavy' \}/);
  assert.match(inlineScript, /var rainDepth = config\.type === 'rain' \? Math\.random\(\) : 0/);
  assert.match(inlineScript, /--reference-rain-drift', '0px'/);
  assert.match(inlineScript, /--reference-rain-angle', '0deg'/);
  assert.match(inlineScript, /--reference-rain-splash-size', \(4 \+ rainDepth \* 7\)/);
  assert.match(page, /home-reference-fall-item\.is-rain::after/);
  assert.match(page, /@keyframes home-reference-rain-splash/);
  assert.match(page, /rotate\(0deg\)/);
});

test('首页不展示冗余节气摘要，动效仍由同色系背景承载', () => {
  assert.doesNotMatch(page, /home-solar-summary|homeSolarSummaryName|homeSolarSummaryCore|homeSolarSummaryMotion/);
  assert.doesNotMatch(inlineScript, /HOME_SOLAR_MEANINGS|getHomeTermFallingDescription|setHomeSolarSummary/);
  assert.match(inlineScript, /function getHomeSolarBackground\(colors, shape\)/);
  assert.match(page, /@keyframes home-reference-leaf-fall/);
  assert.match(page, /class="home-reference-leaf-layer" id="homeReferenceLeafLayer"/);
  assert.doesNotMatch(page, /@keyframes solar-rise|@keyframes solar-heat-rise/);
  assert.doesNotMatch(page, /home-solar-side|home-solar-stage|home-solar-ribbon/);
});

test('天气功能不进入当前页面运行时', () => {
  assert.doesNotMatch(page, /localWeatherBtn|navigator\.geolocation|open-meteo|home-weather/);
  assert.doesNotMatch(inlineScript, /requestLocalWeather|getHomeWeatherEffect/);
});


test('粒子性能预算、近大远小与低频超大近景完整', () => {
  assert.match(page, /contain: layout style/);
  assert.match(page, /z-index: var\(--reference-depth-z, 1\)/);
  assert.match(page, /filter: blur\(var\(--reference-depth-blur, 0px\)\)/);
  assert.match(page, /\.home-reference-fall-item\.is-hero/);
  assert.match(page, /@keyframes home-reference-hero-fall/);
  assert.match(inlineScript, /var HOME_REFERENCE_DEPTH_PROFILES = \[/);
  assert.match(inlineScript, /\{ size: 1\.18, opacity: 0\.95, blur: 0, speed: 0\.9, z: 3 \}/);
  assert.match(inlineScript, /var maxActive = Math\.min\(HOME_REFERENCE_LEAF_MAX, getHomeReferenceBudget\(\)\)/);
  assert.match(inlineScript, /var depthIndex = depthSample < 0\.22 \? 0 : depthSample < 0\.68 \? 1 : 2/);
  assert.match(inlineScript, /--reference-rain-size', \(\(22 \+ rainDepth \* 42\) \* profile\.size \* depthProfile\.size\)/);
  assert.match(inlineScript, /var homeReferenceHeroTimer = null/);
  assert.match(inlineScript, /function spawnHomeReferenceHero\(colors, termName\)/);
  assert.match(inlineScript, /window\.setTimeout\(runHomeReferenceHero, 10000\)/);
  assert.match(inlineScript, /Math\.min\(220, Math\.max\(72, Math\.round\(width \* 0\.1\)\)\)/);
});

