import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const publicRoot = path.resolve('website/public');
const workshopRoot = path.resolve('workshops');

const workshops = [
  { number: 1, slug: 'workshop-01', page: 'task-manager.html' },
  { number: 2, slug: 'workshop-02', page: 'job-application-cdk.html' },
  { number: 3, slug: 'workshop-03', page: 's3-file-sharing.html' },
  { number: 4, slug: 'workshop-04', page: 'ecommerce-catalog.html' },
  { number: 5, slug: 'workshop-05', page: 'brownfield-ecommerce.html' },
];

function decodeEntities(value) {
  return value
    .replaceAll('&amp;', '&')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'")
    .replaceAll('&nbsp;', ' ');
}

function stripTags(value) {
  return decodeEntities(value)
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<\/li>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/[ \t]{2,}/g, ' ')
    .trim();
}

function textMatch(html, pattern) {
  const match = html.match(pattern);
  return match ? stripTags(match[1]) : '';
}

function allMatches(html, pattern) {
  return [...html.matchAll(pattern)].map((match) => match[1]);
}

function extractListItems(html) {
  return allMatches(html, /<li[^>]*>([\s\S]*?)<\/li>/gi).map(stripTags).filter(Boolean);
}

function extractExternalLinks(html) {
  const links = [...html.matchAll(/<a\b[^>]*href="(https?:\/\/[^"]+)"[^>]*>([\s\S]*?)<\/a>/gi)];
  const seen = new Set();
  return links.map(([, href, label]) => ({
    href,
    label: stripTags(label) || href,
  })).filter((link) => {
    const key = `${link.href}|${link.label}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function extractPrompts(html) {
  const blocks = [...html.matchAll(/<div class="prompt-title">([\s\S]*?)<\/div>\s*<div class="(?:prompt-box|intent-prompt)"[\s\S]*?<pre[^>]*id="([^"]+)"[^>]*>([\s\S]*?)<\/pre>/gi)];
  const prompts = blocks.map(([, title, id, prompt]) => ({
    title: stripTags(title),
    id,
    prompt: decodeEntities(prompt).trim(),
  }));
  const intentBlocks = [...html.matchAll(/<div class="intent-card">\s*<h5[^>]*>([\s\S]*?)<\/h5>[\s\S]*?<pre[^>]*id="([^"]+)"[^>]*>([\s\S]*?)<\/pre>/gi)];
  for (const [, title, id, prompt] of intentBlocks) {
    prompts.push({
      title: stripTags(title),
      id,
      prompt: decodeEntities(prompt).trim(),
    });
  }
  return prompts;
}

function extractActivityTitles(html) {
  const titles = allMatches(html, /<div class="prompt-title">([\s\S]*?)<\/div>/gi).map(stripTags).filter(Boolean);
  const intentTitles = allMatches(html, /<div class="intent-card">\s*<h5[^>]*>([\s\S]*?)<\/h5>/gi).map((title) => `Build option: ${stripTags(title)}`);
  return titles.concat(intentTitles).filter(Boolean);
}

function extractVisionSection(html) {
  const match = html.match(/<div class="vision-section">([\s\S]*?)<\/div>\s*<h3 class="mt-5 mb-3">Workshop Activities<\/h3>/i)
    || html.match(/<div class="vision-section">([\s\S]*?)<\/div>\s*<h3 class="mt-5 mb-4">Pick What to Build<\/h3>/i);
  return match ? match[1] : '';
}

function metadataFor(html) {
  const title = textMatch(html, /<title[^>]*>([\s\S]*?)<\/title>/i).replace(/ - AI-DLC Workshop$/, '');
  const heading = textMatch(html, /<h2[^>]*>([\s\S]*?)<\/h2>/i).replace(/^Workshop \d+:\s*/, '');
  const summary = textMatch(html, /<p class="lead"[^>]*>([\s\S]*?)<\/p>/i);
  const vision = extractVisionSection(html);
  const overview = textMatch(html, /<h3[^>]*>Workshop Overview<\/h3>\s*<p[^>]*>([\s\S]*?)<\/p>/i)
    || textMatch(vision, /<h3[^>]*>Workshop Overview<\/h3>([\s\S]*?)(?:<h4|$)/i)
    || stripTags(vision);
  const prerequisitesHtml = html.match(/<h4[^>]*>\s*Prerequisites\s*<\/h4>\s*<ul>([\s\S]*?)<\/ul>/i)?.[1] || vision;
  const prerequisites = extractListItems(prerequisitesHtml);
  const prompts = extractPrompts(html);
  const activities = extractActivityTitles(html);
  const externalLinks = extractExternalLinks(html);

  return { title, heading, summary, overview, prerequisites, prompts, activities, externalLinks };
}

function bulletList(items, fallback = 'None discovered in the source page.') {
  return items.length ? items.map((item) => `- ${item}`).join('\n') : fallback;
}

function linkList(items) {
  return items.length
    ? items.map((item) => `- [${item.label}](${item.href})`).join('\n')
    : 'No external links discovered in the source page.';
}

function promptsMarkdown(prompts) {
  if (!prompts.length) return 'No copyable prompts were discovered in the source page.\n';
  return prompts.map((prompt, index) => `## ${index + 1}. ${prompt.title}\n\nSource ID: \`${prompt.id}\`\n\n\`\`\`text\n${prompt.prompt}\n\`\`\``).join('\n\n');
}

for (const workshop of workshops) {
  const html = await readFile(path.join(publicRoot, workshop.page), 'utf8');
  const meta = metadataFor(html);
  const dir = path.join(workshopRoot, workshop.slug);

  await mkdir(path.join(dir, 'content'), { recursive: true });
  await mkdir(path.join(dir, 'assets'), { recursive: true });
  await mkdir(path.join(dir, 'exercises'), { recursive: true });
  await mkdir(path.join(dir, 'solutions'), { recursive: true });

  await writeFile(path.join(dir, 'README.md'), `# ${meta.heading || meta.title}\n\n${meta.summary}\n\n## Purpose\n\n${meta.overview || 'Purpose is captured in the source workshop page.'}\n\n## Source\n\n- Reconstructed page: \`../../website/public/${workshop.page}\`\n- Original source details: \`../../source-mirror/manifests/crawl-manifest.json\`\n\n## Prerequisites\n\n${bulletList(meta.prerequisites)}\n\n## How To Run Or View\n\nOpen \`../../website/public/${workshop.page}\` in a browser, or serve \`website/public/\` with the Java static server once Phase 5 is complete.\n\n## Folder Contents\n\n- \`content/overview.md\`: workshop summary, source references, prerequisites, and external references.\n- \`exercises/activities.md\`: extracted activity sequence from the workshop page.\n- \`exercises/prompts.md\`: extracted copyable prompts from the workshop page.\n- \`assets/README.md\`: asset notes and shared-asset references.\n- \`solutions/README.md\`: solution-file status.\n\n## Known Dependencies\n\n- Bootstrap 5.3.2 from jsDelivr.\n- Bootstrap Icons 1.11.3 from jsDelivr.\n- Shared local site CSS and JavaScript in \`../../website/public/assets/\`.\n${meta.externalLinks.length ? `- External links are listed in \`content/overview.md\`.` : ''}\n`);

  await writeFile(path.join(dir, 'content/overview.md'), `# ${meta.heading || meta.title} Overview\n\n## Summary\n\n${meta.summary || 'No summary found.'}\n\n## Workshop Purpose\n\n${meta.overview || 'No overview found.'}\n\n## Source Page\n\n- Local page: \`../../website/public/${workshop.page}\`\n- Workshop number: ${workshop.number}\n\n## Prerequisites\n\n${bulletList(meta.prerequisites)}\n\n## External References\n\n${linkList(meta.externalLinks)}\n\n## Extracted Asset References\n\nNo workshop-specific image, font, starter, or binary asset files were discovered in the Phase 2 crawl. The workshop page references shared site assets under \`website/public/assets/\` and external Bootstrap CDN assets.\n`);

  await writeFile(path.join(dir, 'exercises/activities.md'), `# ${meta.heading || meta.title} Activities\n\nExtracted activity headings from \`../../website/public/${workshop.page}\`.\n\n${meta.activities.map((activity, index) => `${index + 1}. ${activity}`).join('\n') || 'No activities discovered.'}\n`);

  await writeFile(path.join(dir, 'exercises/prompts.md'), `# ${meta.heading || meta.title} Prompts\n\nExtracted copyable prompt blocks from \`../../website/public/${workshop.page}\`.\n\n${promptsMarkdown(meta.prompts)}\n`);

  await writeFile(path.join(dir, 'assets/README.md'), `# ${meta.heading || meta.title} Assets\n\nNo workshop-specific image, font, starter, or binary assets were discovered in the Phase 2 crawl.\n\nReferenced shared website assets:\n\n- \`../../website/public/assets/css/styles.css\`\n- \`../../website/public/assets/js/\`\n\nExternal presentation dependencies remain CDN-hosted in Phase 4:\n\n- Bootstrap 5.3.2 CSS/JS\n- Bootstrap Icons 1.11.3\n`);

  await writeFile(path.join(dir, 'solutions/README.md'), `# ${meta.heading || meta.title} Solutions\n\nNo solution files were discovered in the source crawl for this workshop.\n\nIf solution files are added later, keep learner-facing instructions in \`../content/\` and place completed reference implementations or answer keys in this folder.\n`);
}
