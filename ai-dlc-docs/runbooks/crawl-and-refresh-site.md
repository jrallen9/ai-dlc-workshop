# Crawl And Refresh Site

## Purpose

Use this runbook to refresh the raw mirror from the CloudFront-hosted AI-DLC workshop site and regenerate crawl inventories.

## Prerequisites

- WSL Ubuntu shell from the repository root.
- `wget` available on PATH.
- Node.js available on PATH.
- Network access to `https://d3h5h54wint40o.cloudfront.net/index.html`.

## Refresh Steps

1. Run the crawl:

   ```bash
   bash tools/crawl/crawl-site.sh
   ```

2. Confirm generated manifests exist:

   ```bash
   ls source-mirror/manifests
   ```

3. Review missing local references:

   ```bash
   node -e "const a=require('./source-mirror/manifests/asset-inventory.json'); const l=require('./source-mirror/manifests/link-inventory.json'); console.log({missingLocalAssets:a.missingLocalAssets.length, missingLocalLinks:l.missingLocalLinks.length});"
   ```

## Current Source Shape

The April 25, 2026 crawl found a static Bootstrap site. Workshop 1 through Workshop 5 are linked from `index.html` as separate static HTML pages with query-string workshop numbers. The pages use local CSS and JavaScript plus Bootstrap and Bootstrap Icons from jsDelivr.

## Outputs

- Raw mirror: `source-mirror/raw/d3h5h54wint40o.cloudfront.net/`
- Crawl manifest: `source-mirror/manifests/crawl-manifest.json`
- Asset inventory: `source-mirror/manifests/asset-inventory.json`
- Link inventory: `source-mirror/manifests/link-inventory.json`
