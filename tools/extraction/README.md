# Extraction Tools

Helpers for design, layout, and workshop content extraction.

Reconstruct the public website from the raw source mirror:

```bash
node tools/extraction/reconstruct-website.mjs
```

The reconstruction writes static HTML files to `website/public/` and places shared assets under `website/public/assets/`.

Extract workshop materials from the reconstructed static pages:

```bash
node tools/extraction/extract-workshops.mjs
```

The extraction writes per-workshop overview, activities, prompts, asset notes, and solution status into `workshops/workshop-01` through `workshops/workshop-05`.
