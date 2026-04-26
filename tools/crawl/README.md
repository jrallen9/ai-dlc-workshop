# Crawl Tools

Repeatable scripts for crawling the source website and generating crawl manifests.

From the repository root:

```bash
bash tools/crawl/crawl-site.sh
```

The crawl stores the untouched source mirror under `source-mirror/raw/` and regenerates:

- `source-mirror/manifests/crawl-manifest.json`
- `source-mirror/manifests/asset-inventory.json`
- `source-mirror/manifests/link-inventory.json`

The scripts default to `https://d3h5h54wint40o.cloudfront.net/index.html`. Override `SOURCE_URL`, `SOURCE_DOMAIN`, or `RAW_ROOT` if the source location changes.
