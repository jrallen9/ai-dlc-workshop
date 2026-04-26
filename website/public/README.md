# Public Website

This directory is the intended local document root for the Java static webserver.

The local homepage is `index.html`.

Workshop pages use normalized static filenames:

- `task-manager.html`
- `job-application-cdk.html`
- `s3-file-sharing.html`
- `ecommerce-catalog.html`
- `brownfield-ecommerce.html`

Regenerate this directory from the raw crawl with:

```bash
node tools/extraction/reconstruct-website.mjs
```
