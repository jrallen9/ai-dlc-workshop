# Crawl Manifests

Generated inventories for downloaded pages, assets, links, and missing resources.

- `crawl-manifest.json`: downloaded files, hashes, source URLs, HTML pages, and workshop page mapping.
- `asset-inventory.json`: local CSS/JavaScript assets, external CDN assets, and missing local asset references.
- `link-inventory.json`: local, fragment, and external links with missing local link checks.

Regenerate with:

```bash
bash tools/crawl/crawl-site.sh
```
