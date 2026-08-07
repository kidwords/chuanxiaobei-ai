// 临时脚本：从 chinese-traditional-colors/index.html 提取节气配色数据，用于混色方案分析。
// 用法：node scripts/extract-solar-data.mjs
// 完成分析后可删除。
import { readFileSync, writeFileSync } from 'node:fs';

const html = readFileSync('chinese-traditional-colors/index.html', 'utf8');

// 花括号平衡提取（处理字符串与转义），返回 { 起始下标, 完整 JSON 文本 }
function extractBalanced(source, marker) {
  const start = source.indexOf(marker);
  if (start < 0) throw new Error('未找到: ' + marker);
  const braceStart = source.indexOf('{', start);
  let depth = 0, inString = false, escape = false;
  for (let i = braceStart; i < source.length; i++) {
    const ch = source[i];
    if (inString) {
      if (escape) escape = false;
      else if (ch === '\\') escape = true;
      else if (ch === '"') inString = false;
      continue;
    }
    if (ch === '"') inString = true;
    else if (ch === '{') depth++;
    else if (ch === '}') {
      depth--;
      if (depth === 0) return source.slice(braceStart, i + 1);
    }
  }
  throw new Error('花括号不平衡: ' + marker);
}

const SCENES = JSON.parse(extractBalanced(html, 'var SOLAR_SCENES = '));
// SOLAR_16_COLORS 与 SOLAR_BLEND_OVERRIDES 是无引号键的 JS 字面量，用求值方式解析
const C16 = new Function('return ' + extractBalanced(html, 'var SOLAR_16_COLORS = '))();
const overridesRaw = extractBalanced(html, 'var SOLAR_BLEND_OVERRIDES = ');
const OVERRIDES = new Function('return ' + overridesRaw)();

console.log('节气数:', Object.keys(SCENES).length);
console.log('十六色节气数:', Object.keys(C16).length);
console.log('override 数:', Object.keys(OVERRIDES).length, '->', Object.keys(OVERRIDES).join(','));

writeFileSync(
  'scripts/tmp-solar-scenes.json',
  JSON.stringify({ SCENES, OVERRIDES, C16 }, null, 1)
);
console.log('saved -> scripts/tmp-solar-scenes.json');
