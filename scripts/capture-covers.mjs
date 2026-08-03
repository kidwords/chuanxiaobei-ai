import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const excludedDirectories = new Set(['.git', 'scripts', 'assets', 'node_modules']);
let missing = 0;
let checked = 0;

for (const entry of readdirSync(root, { withFileTypes: true })) {
  if (!entry.isDirectory() || excludedDirectories.has(entry.name)) continue;
  const dir = join(root, entry.name);
  const metaPath = join(dir, 'meta.json');
  if (!existsSync(join(dir, 'index.html')) || !existsSync(metaPath)) continue;
  checked++;
  const meta = JSON.parse(readFileSync(metaPath, 'utf8'));
  if (!existsSync(join(dir, 'cover.png'))) {
    missing++;
    console.warn(`缺少封面：${entry.name}/cover.png（${meta.title ?? entry.name}）`);
  }
}

if (missing) process.exitCode = 1;
console.log(`已检查 ${checked} 个项目，${missing ? `缺少 ${missing} 张封面` : '封面齐全'}。`);
