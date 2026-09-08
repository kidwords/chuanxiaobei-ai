import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = join(import.meta.dirname, '..');
const excludedDirectories = new Set(['scripts', 'projects', 'assets', 'node_modules']);
const indexPath = join(root, 'index.html');
const start = '<!-- PROJECTS:START -->';
const end = '<!-- PROJECTS:END -->';
const coverExtensions = ['.png', '.jpg', '.jpeg', '.webp', '.avif', '.gif', '.svg'];

function esc(value = '') {
  return String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
}

function findCover(slug) {
  const projectDirectory = join(root, slug);
  const files = readdirSync(projectDirectory, { withFileTypes: true });
  const byName = new Map(files.filter((entry) => entry.isFile()).map((entry) => [entry.name.toLowerCase(), entry.name]));

  for (const extension of coverExtensions) {
    const fileName = byName.get(`cover${extension}`);
    if (fileName) return fileName;
  }

  return '';
}

function projectCard(slug, meta) {
  const href = esc(`${slug}/index.html`);
  const coverName = findCover(slug);
  const coverSource = coverName ? `${slug}/${coverName}` : '';
  const cover = coverSource ? `<img src="${esc(coverSource)}" alt="${esc(meta.title ?? slug)}项目预览" loading="lazy">` : '';
  const tags = (meta.tags ?? ['HTML']).map((tag) => `<span class="tag">${esc(tag)}</span>`).join('');
  const source = meta.github ? `<a class="button" href="${esc(meta.github)}" target="_blank" rel="noopener noreferrer">查看源代码</a>` : '';
  return `<article class="project-card">
  <a class="project-cover" href="${href}" aria-label="打开${esc(meta.title ?? slug)}">${cover}</a>
  <div class="project-content">
    <div class="project-meta"><span class="repo">${esc(meta.repository ?? slug)}</span><span>${esc(meta.license ?? '未声明')}</span></div>
    <h3><a href="${href}">${esc(meta.title ?? slug)}</a></h3>
    <p class="project-summary">${esc(meta.summary ?? '静态项目成品。')}</p>
    <div class="tags">${tags}</div>
    <div class="project-actions"><a class="button button-primary" href="${href}">立即体验</a>${source}</div>
  </div>
</article>`;
}

const cards = existsSync(root)
  ? readdirSync(root, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => {
        const dir = join(root, entry.name);
        if (excludedDirectories.has(entry.name) || !existsSync(join(dir, 'index.html'))) return '';
        const metaPath = join(dir, 'meta.json');
        const meta = existsSync(metaPath) ? JSON.parse(readFileSync(metaPath, 'utf8')) : {};
        return projectCard(entry.name, meta);
      })
      .filter(Boolean)
      .join('\n')
  : '';

const html = readFileSync(indexPath, 'utf8');
if (!html.includes(start) || !html.includes(end)) throw new Error('未找到项目卡片生成标记');
writeFileSync(indexPath, html.replace(new RegExp(`${start}[\\s\\S]*?${end}`), `${start}\n${cards}\n${end}`));
console.log(`已生成 ${cards ? cards.split('<article').length - 1 : 0} 个项目卡片：${relative(process.cwd(), indexPath)}`);
