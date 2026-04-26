import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const rawRoot = path.resolve('source-mirror/raw/d3h5h54wint40o.cloudfront.net');
const publicRoot = path.resolve('website/public');

const pageMap = new Map([
  ['index.html', 'index.html'],
  ['register.html', 'register.html'],
  ['task-manager.html?workshop=1.html', 'task-manager.html'],
  ['job-application-cdk.html?workshop=2.html', 'job-application-cdk.html'],
  ['s3-file-sharing.html?workshop=3.html', 's3-file-sharing.html'],
  ['ecommerce-catalog.html?workshop=4.html', 'ecommerce-catalog.html'],
  ['brownfield-ecommerce.html?workshop=5.html', 'brownfield-ecommerce.html'],
]);

const scriptFiles = [
  'script.js',
  'register.js',
  'task-manager.js',
  'job-application-cdk.js',
  's3-file-sharing.js',
  'ecommerce-catalog.js',
];

const linkRewrites = new Map([
  ['styles.css', 'assets/css/styles.css'],
  ['script.js', 'assets/js/script.js'],
  ['register.js', 'assets/js/register.js'],
  ['task-manager.js', 'assets/js/task-manager.js'],
  ['job-application-cdk.js', 'assets/js/job-application-cdk.js'],
  ['s3-file-sharing.js', 'assets/js/s3-file-sharing.js'],
  ['ecommerce-catalog.js', 'assets/js/ecommerce-catalog.js'],
  ['task-manager.html?workshop=1', 'task-manager.html'],
  ['job-application-cdk.html?workshop=2', 'job-application-cdk.html'],
  ['s3-file-sharing.html?workshop=3', 's3-file-sharing.html'],
  ['ecommerce-catalog.html?workshop=4', 'ecommerce-catalog.html'],
  ['brownfield-ecommerce.html?workshop=5', 'brownfield-ecommerce.html'],
]);

function rewriteReferences(html) {
  let output = html;
  for (const [source, target] of linkRewrites) {
    output = output.replaceAll(`href="${source}"`, `href="${target}"`);
    output = output.replaceAll(`src="${source}"`, `src="${target}"`);
  }
  return output;
}

await mkdir(path.join(publicRoot, 'assets/css'), { recursive: true });
await mkdir(path.join(publicRoot, 'assets/js'), { recursive: true });
await mkdir(path.join(publicRoot, 'assets/images'), { recursive: true });
await mkdir(path.join(publicRoot, 'assets/fonts'), { recursive: true });

for (const [source, target] of pageMap) {
  const html = await readFile(path.join(rawRoot, source), 'utf8');
  await writeFile(path.join(publicRoot, target), rewriteReferences(html));
}

const css = await readFile(path.join(rawRoot, 'styles.css'), 'utf8');
await writeFile(path.join(publicRoot, 'assets/css/styles.css'), css);

for (const scriptFile of scriptFiles) {
  const script = await readFile(path.join(rawRoot, scriptFile), 'utf8');
  await writeFile(path.join(publicRoot, 'assets/js', scriptFile), script);
}
