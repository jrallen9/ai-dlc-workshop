import { createHash } from 'node:crypto';
import { readdir, readFile, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';

const sourceHost = 'd3h5h54wint40o.cloudfront.net';
const sourceOrigin = `https://${sourceHost}`;
const rawRoot = path.resolve('source-mirror/raw', sourceHost);
const manifestRoot = path.resolve('source-mirror/manifests');

const htmlAttrPattern = /\b(?:href|src|action)=["']([^"']+)["']/gi;
const cssUrlPattern = /url\(["']?([^"')]+)["']?\)/gi;

const fileTypeByExt = new Map([
  ['.html', 'html'],
  ['.css', 'css'],
  ['.js', 'javascript'],
  ['.png', 'image'],
  ['.jpg', 'image'],
  ['.jpeg', 'image'],
  ['.gif', 'image'],
  ['.svg', 'image'],
  ['.webp', 'image'],
  ['.woff', 'font'],
  ['.woff2', 'font'],
  ['.ttf', 'font'],
  ['.otf', 'font'],
]);

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(entries.map(async (entry) => {
    const fullPath = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(fullPath) : fullPath;
  }));
  return files.flat().sort();
}

function normalizeQueryFilename(filename) {
  return filename.endsWith('.html') && filename.includes('?')
    ? filename.slice(0, -'.html'.length)
    : filename;
}

function sourceUrlFor(relativePath) {
  const normalized = relativePath.split(path.sep).join('/');
  return `${sourceOrigin}/${normalizeQueryFilename(normalized)}`;
}

function classifyFile(file) {
  if (file.includes('?') && file.endsWith('.html')) return 'html';
  return fileTypeByExt.get(path.extname(file).toLowerCase()) || 'other';
}

function extractTitle(html) {
  return html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1].replace(/\s+/g, ' ').trim() || null;
}

function extractHeading(html, tag) {
  return html
    .match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i'))?.[1]
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .trim() || null;
}

function classifyReference(ref) {
  if (ref.startsWith('#')) return 'fragment';
  if (/^https?:\/\//i.test(ref)) return 'external';
  if (/^(mailto|tel):/i.test(ref)) return 'external';
  return 'local';
}

function resolveLocalReference(ref, fromFile) {
  if (classifyReference(ref) !== 'local') return null;
  const withoutFragment = ref.split('#')[0];
  const [pathname, query] = withoutFragment.split('?');
  if (!pathname) return null;
  const sourceDir = path.dirname(fromFile);
  const candidate = query
    ? `${pathname}?${query}.html`
    : pathname;
  return path.normalize(path.join(sourceDir, candidate));
}

function contentHash(buffer) {
  return createHash('sha256').update(buffer).digest('hex');
}

const files = await walk(rawRoot);
const downloadedFiles = [];
const htmlPages = [];
const assetRefs = [];
const linkRefs = [];

for (const fullPath of files) {
  const relativePath = path.relative(rawRoot, fullPath);
  const bytes = await readFile(fullPath);
  const stats = await stat(fullPath);
  const type = classifyFile(relativePath);

  downloadedFiles.push({
    path: relativePath.split(path.sep).join('/'),
    type,
    sizeBytes: stats.size,
    sha256: contentHash(bytes),
    sourceUrl: sourceUrlFor(relativePath),
  });

  const text = bytes.toString('utf8');
  if (type === 'html') {
    htmlPages.push({
      path: relativePath.split(path.sep).join('/'),
      sourceUrl: sourceUrlFor(relativePath),
      title: extractTitle(text),
      h1: extractHeading(text, 'h1'),
      h2: extractHeading(text, 'h2'),
    });

    for (const match of text.matchAll(htmlAttrPattern)) {
      const ref = match[1].trim();
      const record = {
        from: relativePath.split(path.sep).join('/'),
        reference: ref,
        kind: classifyReference(ref),
      };
      const localTarget = resolveLocalReference(ref, relativePath);
      if (localTarget) {
        record.localTarget = localTarget.split(path.sep).join('/');
      }
      if (/\.(css|js|png|jpe?g|gif|svg|webp|woff2?|ttf|otf)(?:[?#].*)?$/i.test(ref) || ref.includes('cdn.jsdelivr.net')) {
        assetRefs.push(record);
      } else {
        linkRefs.push(record);
      }
    }
  }

  if (type === 'css') {
    for (const match of text.matchAll(cssUrlPattern)) {
      assetRefs.push({
        from: relativePath.split(path.sep).join('/'),
        reference: match[1].trim(),
        kind: classifyReference(match[1].trim()),
      });
    }
  }
}

const downloadedByPath = new Set(downloadedFiles.map((file) => file.path));
for (const ref of assetRefs.concat(linkRefs)) {
  if (ref.localTarget && ref.downloaded === undefined) {
    ref.downloaded = downloadedByPath.has(ref.localTarget);
  }
}

const workshopPages = htmlPages
  .filter((page) => /workshop=\d/.test(page.path) || /Workshop \d/i.test(`${page.title || ''} ${page.h2 || ''}`))
  .map((page) => {
    const workshopNumber = page.path.match(/workshop=(\d)/)?.[1] || page.title?.match(/Workshop (\d)/i)?.[1] || null;
    return {
      workshopNumber: workshopNumber ? Number(workshopNumber) : null,
      path: page.path,
      sourceUrl: page.sourceUrl,
      title: page.title,
      pageHeading: page.h2 || page.h1,
      rendering: 'static HTML with Bootstrap tabs and small page-specific JavaScript',
    };
  })
  .sort((a, b) => (a.workshopNumber || 99) - (b.workshopNumber || 99));

const generatedAt = new Date().toISOString();

await writeFile(path.join(manifestRoot, 'crawl-manifest.json'), `${JSON.stringify({
  generatedAt,
  sourceOrigin,
  rawRoot: 'source-mirror/raw/d3h5h54wint40o.cloudfront.net',
  crawlTooling: 'wget plus tools/crawl/generate-manifests.mjs',
  downloadedFileCount: downloadedFiles.length,
  htmlPageCount: htmlPages.length,
  downloadedFiles,
  htmlPages,
  workshopPages,
}, null, 2)}\n`);

await writeFile(path.join(manifestRoot, 'asset-inventory.json'), `${JSON.stringify({
  generatedAt,
  localAssets: downloadedFiles.filter((file) => ['css', 'javascript', 'image', 'font'].includes(file.type)),
  referencedAssets: assetRefs,
  externalAssets: assetRefs.filter((ref) => ref.kind === 'external'),
  missingLocalAssets: assetRefs.filter((ref) => ref.kind === 'local' && ref.localTarget && !ref.downloaded),
}, null, 2)}\n`);

await writeFile(path.join(manifestRoot, 'link-inventory.json'), `${JSON.stringify({
  generatedAt,
  links: linkRefs,
  externalLinks: linkRefs.filter((ref) => ref.kind === 'external'),
  localLinks: linkRefs.filter((ref) => ref.kind === 'local'),
  fragmentLinks: linkRefs.filter((ref) => ref.kind === 'fragment'),
  missingLocalLinks: linkRefs.filter((ref) => ref.kind === 'local' && ref.localTarget && !ref.downloaded),
}, null, 2)}\n`);
