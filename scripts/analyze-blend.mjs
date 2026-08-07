// 临时脚本：诊断 24 节气当前混色（首页实际生效的渐变对）与节气意象的关联度。
// 用法：node scripts/analyze-blend.mjs
import { readFileSync } from 'node:fs';
import { execSync } from 'node:child_process';

const { SCENES, OVERRIDES } = JSON.parse(readFileSync('scripts/tmp-solar-scenes.json', 'utf8'));

// ---- 颜色工具 ----
function hexToRgb(hex) {
  return [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16));
}
function rgbToHsl([r, g, b]) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0; const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
    else if (max === g) h = ((b - r) / d + 2) / 6;
    else h = ((r - g) / d + 4) / 6;
  }
  return { h: h * 360, s, l };
}
function hexToHsl(hex) { return rgbToHsl(hexToRgb(hex)); }
function hueDist(a, b) { const d = Math.abs(a - b) % 360; return d > 180 ? 360 - d : d; }
function luma(hex) {
  const [r, g, b] = hexToRgb(hex);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

// 复现页面逻辑：getSolarBlend(name, 'light')
function getSolarBlend(name) {
  const scheme = SCENES[name] && SCENES[name].light;
  if (!scheme || !scheme.colors || scheme.colors.length < 3) return null;
  const override = OVERRIDES[name];
  if (override) return { first: override.first, second: override.second, src: 'override' };
  return { first: scheme.colors[1], second: scheme.colors[2], src: 'scheme[1],[2]' };
}

const names = Object.keys(SCENES);
const rows = [];
for (const name of names) {
  const b = getSolarBlend(name);
  const h1 = hexToHsl(b.first.hex), h2 = hexToHsl(b.second.hex);
  const hd = hueDist(h1.h, h2.h);
  const ld = Math.abs(h1.l - h2.l);
  const lm = luma(b.first.hex) + luma(b.second.hex);
  rows.push({
    name, season: SCENES[name].season, desc: SCENES[name].desc,
    first: b.first.name + ' ' + b.first.hex, second: b.second.name + ' ' + b.second.hex,
    src: b.src, hd: Math.round(hd), ld: +(ld).toFixed(2),
    s1: +h1.s.toFixed(2), s2: +h2.s.toFixed(2)
  });
}

console.log('节气 | 季 | 混色来源 | 色A | 色B | 色相差° | 亮度差 | 饱和度');
for (const r of rows) {
  console.log([r.name, r.season, r.src, r.first, r.second, r.hd, r.ld, r.s1 + '/' + r.s2].join(' | '));
}

// 统计：色相差过大（>60°）与饱和度过低（<0.15 双灰）的项
const bigHue = rows.filter(r => r.hd > 60);
const bothGray = rows.filter(r => r.s1 < 0.15 && r.s2 < 0.15);
console.log('\n色相差>60° 的节气:', bigHue.map(r => r.name + '(' + r.hd + '°)').join(', ') || '无');
console.log('双端均低饱和(<0.15):', bothGray.map(r => r.name).join(', ') || '无');

// 检查 override 颜色是否来自该节气的十六色
const C16 = JSON.parse(readFileSync('scripts/tmp-solar-scenes.json', 'utf8')).C16;
console.log('\noverride 颜色与节气十六色的归属检查:');
for (const [name, ov] of Object.entries(OVERRIDES)) {
  const pool = (C16[name] || []).map(c => c.hex.toUpperCase());
  const fOk = pool.includes(ov.first.hex.toUpperCase());
  const sOk = pool.includes(ov.second.hex.toUpperCase());
  console.log('  ' + name + ': ' + ov.first.name + (fOk ? '(本节气)' : '(外部色!)') + ' + ' + ov.second.name + (sOk ? '(本节气)' : '(外部色!)'));
}
