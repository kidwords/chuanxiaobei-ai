// 临时脚本：生成混色方案对比预览页 previews/blend-proposals.html
// 用法：node scripts/build-blend-preview.mjs
// 所有候选色必须取自该节气自身十六色，脚本自动校验。完成评审后可删除本脚本与预览页。
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const { SCENES, OVERRIDES, C16 } = JSON.parse(
  readFileSync('scripts/tmp-solar-scenes.json', 'utf8')
);

// ---- 三套提案：每个色点 [色名, hex]，均取自本节气十六色 ----
// A 和韵：同色系双色；B 意象三停：三色位场景叙事；C 晨昏光影：径向光感
const PROPOSALS = {
  立春: {
    A: [['缃叶', '#ECD452'], ['苍黄', '#B6A014']],
    B: [['黄白游', '#FFF799'], ['天缥', '#D5EBE1'], ['苍筤', '#99BCAC']],
    C: [['松花', '#FFEE6F'], ['黄白游', '#FFF799'], ['天缥', '#D5EBE1'], ['沧浪', '#B1D5C8']],
    note: '晨光破寒，新芽初绿',
  },
  雨水: {
    A: [['盈盈', '#F9D3E3'], ['紫茎屏风', '#A76283']],
    B: [['盈盈', '#F9D3E3'], ['水红', '#ECB0C1'], ['紫茎屏风', '#A76283']],
    C: [['盈盈', '#F9D3E3'], ['水红', '#ECB0C1'], ['苏梅', '#DD7694'], ['紫茎屏风', '#A76283']],
    note: '杏花微雨，粉雾由浅入深',
  },
  惊蛰: {
    A: [['桃夭', '#F6BEC8'], ['长春', '#DC6B82']],
    B: [['黄栗留', '#FEDC5E'], ['桃夭', '#F6BEC8'], ['长春', '#DC6B82']],
    C: [['黄栗留', '#FEDC5E'], ['桃夭', '#F6BEC8'], ['牙绯', '#C35C5D'], ['青黛', '#45465E']],
    note: '春雷乍动，桃花初绽',
  },
  春分: {
    A: [['吉量', '#EBEDDF'], ['霜地', '#C7C6B6']],
    B: [['皦玉', '#EBEEE8'], ['檀色', '#B26D5D'], ['紫磨金', '#BC836B']],
    C: [['吉量', '#EBEDDF'], ['夏籥', '#D2AF9D'], ['檀色', '#B26D5D'], ['青冥', '#3271AE']],
    note: '昼夜均分，春和景明',
  },
  清明: {
    A: [['香炉紫烟', '#D3CCD6'], ['紫菂', '#9B8EA9']],
    B: [['香炉紫烟', '#D3CCD6'], ['紫菂', '#9B8EA9'], ['三公子', '#663D74']],
    C: [['香炉紫烟', '#D3CCD6'], ['紫菂', '#9B8EA9'], ['拂紫绵', '#7E527F'], ['凝夜紫', '#422256']],
    note: '烟雨清明，紫气东来',
  },
  谷雨: {
    A: [['碧落', '#AED0EE'], ['挼蓝', '#6E9BC5']],
    B: [['碧落', '#AED0EE'], ['苍葭', '#A8BF8F'], ['翠微', '#4C8045']],
    C: [['碧落', '#AED0EE'], ['苍葭', '#A8BF8F'], ['翠微', '#4C8045'], ['翠虬', '#446A37']],
    note: '雨生百谷，碧落苍翠',
  },
  立夏: {
    A: [['青粲', '#C3D94E'], ['水龙吟', '#84A729']],
    B: [['青粲', '#C3D94E'], ['水龙吟', '#84A729'], ['黑朱', '#70695D']],
    C: [['青粲', '#C3D94E'], ['翠缥', '#B7D332'], ['水龙吟', '#84A729'], ['黑朱', '#70695D']],
    note: '绿意初盛，浓荫渐成',
  },
  小满: {
    A: [['嫩鹅黄', '#F2C867'], ['鞠衣', '#D3A237']],
    B: [['嫩鹅黄', '#F2C867'], ['黄螺', '#B4A379'], ['芰荷', '#4F794A']],
    C: [['嫩鹅黄', '#F2C867'], ['仙米', '#D4C9AA'], ['芰荷', '#4F794A'], ['官绿', '#2A6E3F']],
    note: '麦穗渐黄，丰盈初现',
  },
  芒种: {
    A: [['芸黄', '#D2A36C'], ['雌黄', '#B4884D']],
    B: [['筠雾', '#D5D1AE'], ['青玉案', '#A8B092'], ['风入松', '#868C4E']],
    C: [['筠雾', '#D5D1AE'], ['青玉案', '#A8B092'], ['曾青', '#535164'], ['瑾瑜', '#1E2732']],
    note: '稻田青黄，梅雨将至',
  },
  夏至: {
    A: [['扶光', '#F0C2A2'], ['椒房', '#DB9C5E']],
    B: [['扶光', '#F0C2A2'], ['红友', '#D9883D'], ['光明砂', '#CC5D20']],
    C: [['扶光', '#F0C2A2'], ['红友', '#D9883D'], ['赩炽', '#CB523E'], ['大繎', '#822327']],
    note: '阳气盛极，骄阳似火',
  },
  小暑: {
    A: [['赪霞', '#F18F60'], ['朱柿', '#ED6D46']],
    B: [['骍刚', '#F5B087'], ['天球', '#E0DFC6'], ['柔蓝', '#106898']],
    C: [['骍刚', '#F5B087'], ['赪霞', '#F18F60'], ['蓝采和', '#06436F'], ['帝释青', '#003460']],
    note: '晚霞未尽，暴雨欲来',
  },
  大暑: {
    A: [['绮钱', '#D8DE8A'], ['吉金', '#896D47']],
    B: [['葱青', '#EDF1BB'], ['绮钱', '#D8DE8A'], ['菉竹', '#698E6A']],
    C: [['夕岚', '#E3ADB9'], ['绮钱', '#D8DE8A'], ['青楸', '#81A380'], ['菉竹', '#698E6A']],
    note: '盛夏草木，繁茂至极',
  },
  立秋: {
    A: [['窃蓝', '#88ABDA'], ['监德', '#6F94CD']],
    B: [['窃蓝', '#88ABDA'], ['白青', '#98B6C2'], ['麴尘', '#C0D09D']],
    C: [['缟羽', '#EFEFEF'], ['窃蓝', '#88ABDA'], ['竹月', '#7F9FAF'], ['素綦', '#595333']],
    note: '秋高气爽，暑气渐消',
  },
  处暑: {
    A: [['云门', '#A2D2E2'], ['西子', '#87C0CA']],
    B: [['云门', '#A2D2E2'], ['天水碧', '#5AA4AE'], ['法翠', '#108B96']],
    C: [['云门', '#A2D2E2'], ['西子', '#87C0CA'], ['天水碧', '#5AA4AE'], ['法翠', '#108B96']],
    note: '残暑犹存，秋水渐凉',
  },
  白露: {
    A: [['凝脂', '#F5F2E9'], ['缣缃', '#D5C8A0']],
    B: [['凝脂', '#F5F2E9'], ['缣缃', '#D5C8A0'], ['千山翠', '#6B7D73']],
    C: [['凝脂', '#F5F2E9'], ['黄润', '#DFD6B8'], ['蕉月', '#86908A'], ['绿云', '#45493D']],
    note: '露凝为霜，月照秋意',
  },
  秋分: {
    A: [['栾华', '#C0AD5E'], ['大赤', '#AA9649']],
    B: [['浅云', '#EAEEF1'], ['栾华', '#C0AD5E'], ['蜜褐', '#683632']],
    C: [['浅云', '#EAEEF1'], ['栾华', '#C0AD5E'], ['佛赤', '#8F3D2C'], ['蜜褐', '#683632']],
    note: '天高云淡，桂花飘香',
  },
  寒露: {
    A: [['九斤黄', '#DDB078'], ['杏子', '#DA9233']],
    B: [['九斤黄', '#DDB078'], ['媚蝶', '#BC6E37'], ['韎韐', '#9F5221']],
    C: [['弗肯红', '#ECD9C7'], ['九斤黄', '#DDB078'], ['韎韐', '#9F5221'], ['花青', '#1A2847']],
    note: '晨霜染叶，秋深露寒',
  },
  霜降: {
    A: [['十样锦', '#F8C6B5'], ['棠梨', '#B15A43']],
    B: [['十样锦', '#F8C6B5'], ['棠梨', '#B15A43'], ['朱樱', '#8F1D22']],
    C: [['十样锦', '#F8C6B5'], ['檀唇', '#DA9E8C'], ['棠梨', '#B15A43'], ['爵头', '#631216']],
    note: '深秋霜染，枫叶如火',
  },
  立冬: {
    A: [['半见', '#FFFBC7'], ['姜黄', '#D6C560']],
    B: [['半见', '#FFFBC7'], ['姜黄', '#D6C560'], ['伽罗', '#6D5C3D']],
    C: [['半见', '#FFFBC7'], ['绢纨', '#ECE093'], ['姜黄', '#D6C560'], ['苍艾', '#5A4B3B']],
    note: '初寒乍到，残阳暖冬',
  },
  小雪: {
    A: [['月白', '#D4E5EF'], ['品月', '#8AABCC']],
    B: [['月白', '#D4E5EF'], ['晴山', '#A3BBDB'], ['椒褐', '#72453A']],
    C: [['月白', '#D4E5EF'], ['星郎', '#BCD4E7'], ['晴山', '#A3BBDB'], ['驼褐', '#7C5B3E']],
    note: '初雪降临，山峦叠嶂',
  },
  大雪: {
    A: [['暮山紫', '#A4ABD6'], ['紫苑', '#757CBB']],
    B: [['米汤娇', '#EEEAD9'], ['暮山紫', '#A4ABD6'], ['延维', '#4A4B9D']],
    C: [['米汤娇', '#EEEAD9'], ['暮山紫', '#A4ABD6'], ['优昙瑞', '#615EA8'], ['延维', '#4A4B9D']],
    note: '大雪纷飞，暮山苍茫',
  },
  冬至: {
    A: [['莺儿', '#EBE1A9'], ['姚黄', '#D6BC46']],
    B: [['银红', '#E7CAD3'], ['紫梅', '#BB7A8C'], ['紫矿', '#9E4E56']],
    C: [['莺儿', '#EBE1A9'], ['莲红', '#D9A0B3'], ['紫梅', '#BB7A8C'], ['驖骊', '#46433B']],
    note: '阳生冬至，梅开暗香',
  },
  小寒: {
    A: [['酂白', '#F6F9E4'], ['田赤', '#E1D384']],
    B: [['酂白', '#F6F9E4'], ['井天', '#A4C9CC'], ['獭见', '#151D29']],
    C: [['酂白', '#F6F9E4'], ['田赤', '#E1D384'], ['正青', '#6CA8AF'], ['獭见', '#151D29']],
    note: '极寒冰封，腊梅含苞',
  },
  大寒: {
    A: [['骨缥', '#EBE3C7'], ['绿豆褐', '#92896B']],
    B: [['骨缥', '#EBE3C7'], ['石英', '#C8B6BB'], ['紫诰', '#76555D']],
    C: [['骨缥', '#EBE3C7'], ['石英', '#C8B6BB'], ['紫府', '#995D7F'], ['油紫', '#420B2F']],
    note: '岁末沉寂，寒极将春',
  },
};

// ---- 校验：候选色必须全部来自本节气十六色 ----
const errors = [];
for (const [name, props] of Object.entries(PROPOSALS)) {
  const pool = new Set(C16[name].map(c => c.hex.toUpperCase()));
  for (const [key, stops] of Object.entries(props)) {
    if (key === 'note') continue;
    for (const [cname, hex] of stops) {
      if (!pool.has(hex.toUpperCase())) {
        errors.push(`${name} 方案${key} 的「${cname} ${hex}」不在该节气十六色中`);
      }
    }
  }
}
if (errors.length) {
  console.error('校验失败：');
  errors.forEach(e => console.error('  ' + e));
  process.exit(1);
}
console.log('校验通过：3 套方案 × 24 节气的全部色点均取自本节气十六色');

// ---- 渐变 CSS 生成 ----
const linear = (stops, angle = '135deg') =>
  `linear-gradient(${angle}, ${stops.map(s => s[1]).join(', ')})`;
const radial = (stops) =>
  `radial-gradient(circle at 32% 22%, ${stops.map((s, i) => `${s[1]} ${Math.round((i / (stops.length - 1)) * 100)}%`).join(', ')})`;

// 当前方案（复现页面 getSolarBlend：全部走 override，双色 135°）
const currentOf = (name) => {
  const ov = OVERRIDES[name];
  return { stops: [ov.first, ov.second].map(c => [c.name, c.hex]), css: linear([ov.first, ov.second].map(c => [c.name, c.hex])) };
};

// 文字可读色（同页面 getReadableTextColor 逻辑）
function textColor(hex) {
  const c = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map(v => (v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)));
  const L = 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
  return (1.05 / (L + 0.05)) >= ((L + 0.05) / 0.05) ? '#f8f7f4' : '#171717';
}

// ---- 诊断统计（用于页头说明）----
const hueDist = (a, b) => { const d = Math.abs(a - b) % 360; return d > 180 ? 360 - d : d; };
function hueOf(hex) {
  const [r, g, b] = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16) / 255);
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  if (max === min) return 0;
  const d = max - min;
  let h = max === r ? ((g - b) / d + (g < b ? 6 : 0)) : max === g ? ((b - r) / d + 2) : ((r - g) / d + 4);
  return h * 60;
}
let bigHue = 0, complement = [];
for (const name of Object.keys(SCENES)) {
  const ov = OVERRIDES[name];
  const d = hueDist(hueOf(ov.first.hex), hueOf(ov.second.hex));
  if (d > 60) bigHue++;
  if (d > 135) complement.push(`${name}（${Math.round(d)}°）`);
}

// ---- HTML 生成 ----
const SEASON_LABEL = { 春: '春', 夏: '夏', 秋: '秋', 冬: '冬' };
const solarOrder = Object.keys(SCENES);

function cardHtml(name, title, css, stops, tagline) {
  const chips = stops.map(([n, h]) =>
    `<span class="chip" style="background:${h}"><i style="color:${textColor(h)}">${n}</i></span>`).join('');
  return `<div class="card">
  <button type="button" class="swatch" style="background:${css}" data-css="${css}" aria-label="点击全屏预览 ${name} ${title}">
    <span class="swatch-label">${title}</span>
  </button>
  <div class="chips">${chips}</div>
  <p class="tagline">${tagline}</p>
</div>`;
}

let body = '';
for (const season of ['春', '夏', '秋', '冬']) {
  const terms = solarOrder.filter(n => SCENES[n].season === season);
  body += `<section data-season="${season}">\n`;
  body += `<h2 id="season-${season}" class="season season-${season}">${SEASON_LABEL[season]}季 · ${terms.join(' / ')}</h2>\n`;
  body += `<div class="grid">\n`;
  for (const name of terms) {
    const cur = currentOf(name);
    const p = PROPOSALS[name];
    const desc = SCENES[name].desc;
    body += `<section class="term">
  <header class="term-head">
    <h3>${name}</h3>
    <p class="term-desc">${desc} · ${p.note}</p>
  </header>
  <div class="card-row">
    ${cardHtml(name, '现状', cur.css, cur.stops, '双色 135° 直连')}
    ${cardHtml(name, '方案A · 和韵', linear(p.A), p.A, '同色系双色，柔和过渡')}
    ${cardHtml(name, '方案B · 意象三停', linear(p.B), p.B, '三色叙事，避开灰带')}
    ${cardHtml(name, '方案C · 晨昏光影', radial(p.C), p.C, '径向光斑，节气光感')}
  </div>
</section>\n`;
  }
  body += `</div>\n</section>\n`;
}

const html = `<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>节气混色方案对比 · 评审稿</title>
<style>
  :root { color-scheme: light; }
  * { box-sizing: border-box; }
  body { margin: 0; background: #faf8f5; color: #2b2620; font: 400 15px/1.6 "Noto Sans SC","PingFang SC","Microsoft YaHei",system-ui,sans-serif; }
  .wrap { width: min(100% - 32px, 1280px); margin: 0 auto; padding: 48px 0 96px; }
  h1 { font-size: 30px; font-weight: 600; line-height: 1.3; margin: 0 0 8px; letter-spacing: .02em; }
  .sub { color: #6f675c; margin: 0 0 24px; font-size: 14px; }
  .diag { border: 1px solid #e5ddd0; border-radius: 14px; background: #fff; padding: 24px; margin-bottom: 40px; box-shadow: 0 1px 2px rgba(43,38,32,.05); }
  .diag h2 { margin: 0 0 12px; font-size: 18px; font-weight: 600; }
  .diag p { margin: 0 0 8px; color: #4c453b; }
  .diag strong { color: #b15a43; }
  .diag code { background: #f3efe7; border-radius: 6px; padding: 1px 6px; font-size: 13px; }
  .legend { display: flex; flex-wrap: wrap; gap: 8px; margin: 16px 0 0; }
  .legend span { border-radius: 10px; border: 1px solid #e5ddd0; background: #faf8f5; padding: 4px 12px; font-size: 13px; color: #4c453b; }
  .season { font-size: 20px; font-weight: 600; margin: 40px 0 16px; padding-bottom: 8px; border-bottom: 1px solid #e5ddd0; }
  .season-春 { color: #4c8045; } .season-夏 { color: #b6a014; } .season-秋 { color: #b15a43; } .season-冬 { color: #5976ba; }
  .grid { display: grid; gap: 24px; }
  .term { border: 1px solid #e5ddd0; border-radius: 16px; background: #fff; padding: 24px; box-shadow: 0 1px 2px rgba(43,38,32,.05); }
  .term-head { display: flex; align-items: baseline; gap: 12px; flex-wrap: wrap; margin-bottom: 16px; }
  .term-head h3 { margin: 0; font-size: 20px; font-weight: 600; letter-spacing: .08em; }
  .term-desc { margin: 0; color: #8a8072; font-size: 13px; }
  .card-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
  .card { display: flex; flex-direction: column; gap: 8px; }
  .swatch { position: relative; width: 100%; aspect-ratio: 4 / 3; border-radius: 14px; border: 1px solid rgba(0,0,0,.08); cursor: pointer; padding: 0; overflow: hidden; transition: all .25s; box-shadow: 0 1px 2px rgba(43,38,32,.06); }
  .swatch:hover { transform: scale(1.02); box-shadow: 0 8px 24px rgba(43,38,32,.16); }
  .swatch:focus-visible { outline: 3px solid #3271ae; outline-offset: 2px; }
  .swatch-label { position: absolute; left: 8px; bottom: 8px; font-size: 12px; font-weight: 500; color: #fff; background: rgba(23,23,23,.42); border-radius: 8px; padding: 2px 8px; backdrop-filter: blur(4px); }
  .chips { display: flex; flex-wrap: wrap; gap: 4px; }
  .chip { border-radius: 8px; padding: 1px 6px; font-size: 11px; line-height: 1.5; border: 1px solid rgba(0,0,0,.08); }
  .chip i { font-style: normal; font-weight: 500; text-shadow: 0 1px 2px rgba(0,0,0,.18); }
  .tagline { margin: 0; color: #8a8072; font-size: 12px; }
  #overlay { position: fixed; inset: 0; z-index: 50; display: none; align-items: flex-end; justify-content: center; padding: 32px; cursor: pointer; }
  #overlay.show { display: flex; }
  #overlay .hint { background: rgba(23,23,23,.55); color: #f8f7f4; border-radius: 10px; padding: 8px 16px; font-size: 13px; backdrop-filter: blur(6px); }
  @media (max-width: 1024px) { .card-row { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 600px) { .card-row { grid-template-columns: 1fr; } .wrap { padding-top: 24px; } }
  @media (prefers-reduced-motion: reduce) { .swatch, .swatch:hover { transition: none; transform: none; } }
</style>
</head>
<body>
<div class="wrap">
  <h1>节气混色方案对比 · 评审稿</h1>
  <p class="sub">数据来源：chinese-traditional-colors/index.html · 生成日期 2026-08-07 · 全部候选色均取自各节气自身十六色 · 点击色卡可全屏预览</p>
  <div class="diag">
    <h2>现状诊断</h2>
    <p>当前混色为 <code>SOLAR_BLEND_OVERRIDES</code> 人工指定的<strong>双色 135° 直线渐变</strong>，其中 <strong>${bigHue}/24</strong> 个节气两端色相差超过 60°，以下 ${complement.length} 个接近或达到互补色（渐变中段会经过灰带，显得脏）：</p>
    <p><strong>${complement.join('、')}</strong></p>
    <p>另有 <strong>清明</strong> 两端均为低饱和灰（0.11 / 0.12），与「紫气东来」意象脱节。方案 B/C 通过加入中间色位或径向结构消除灰带，并让色彩走向贴合节气意象。</p>
    <div class="legend">
      <span>现状 · 双色直连</span>
      <span>方案A · 和韵（同色系双色）</span>
      <span>方案B · 意象三停（三色叙事）</span>
      <span>方案C · 晨昏光影（径向光感）</span>
    </div>
  </div>
${body}
</div>
<div id="overlay" role="dialog" aria-label="全屏渐变预览，点击任意处关闭"><span class="hint">点击任意处或按 ESC 退出预览</span></div>
<script>
  // ?only=春 单季渲染，便于无头截图验证
  var only = new URLSearchParams(location.search).get('only');
  if (only) {
    document.querySelectorAll('section[data-season]').forEach(function (sec) {
      if (sec.dataset.season !== only) sec.style.display = 'none';
    });
  }
  var overlay = document.getElementById('overlay');
  document.querySelectorAll('.swatch').forEach(function (btn) {
    btn.addEventListener('click', function () {
      overlay.style.background = btn.dataset.css;
      overlay.classList.add('show');
    });
  });
  overlay.addEventListener('click', function () { overlay.classList.remove('show'); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') overlay.classList.remove('show');
  });
</script>
</body>
</html>
`;

mkdirSync('previews', { recursive: true });
writeFileSync('previews/blend-proposals.html', html);
console.log('已生成 previews/blend-proposals.html');
