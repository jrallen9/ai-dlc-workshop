# Workshop Content Map

## Summary

Phase 4 split the reconstructed workshop pages into five workshop subprojects under `workshops/`.

Each workshop now includes:

- `README.md`
- `content/overview.md`
- `exercises/activities.md`
- `exercises/prompts.md`
- `assets/README.md`
- `solutions/README.md`

No standalone starter files, solution files, images, fonts, or workshop-specific binary assets were discovered in the Phase 2 crawl. The extracted workshop folders reference the normalized public website pages and shared site assets instead.

## Workshop 1

- Folder: `workshops/workshop-01/`
- Local page: `website/public/task-manager.html`
- Title: Task Manager Application
- Summary: Build a simple task manager with AI-DLC methodology.
- Extracted prompts: 9
- Extracted activities: 17
- Stack noted by source: Python / Flask

## Workshop 2

- Folder: `workshops/workshop-02/`
- Local page: `website/public/job-application-cdk.html`
- Title: Job Application Website with CDK
- Summary: Build a job application management site with AWS CDK and AI-DLC.
- Extracted prompts: 6
- Extracted activities: 15
- Stack noted by source: React / Vite / AWS CDK

## Workshop 3

- Folder: `workshops/workshop-03/`
- Local page: `website/public/s3-file-sharing.html`
- Title: S3 File-Sharing System
- Summary: Build a complete web-based file sharing system backed by S3.
- Extracted prompts: 5
- Extracted activities: 14
- Source notes: includes a downloadable `vision.md` generated client-side by page JavaScript.

## Workshop 4

- Folder: `workshops/workshop-04/`
- Local page: `website/public/ecommerce-catalog.html`
- Title: E-Commerce Product Catalog
- Summary: Build a product catalog system with incremental unit-by-unit development.
- Extracted prompts: 7
- Extracted activities: 16

## Workshop 5

- Folder: `workshops/workshop-05/`
- Local page: `website/public/brownfield-ecommerce.html`
- Title: Brownfield E-Commerce Modernization
- Summary: Use AI-DLC Workflow to analyze and modernize an existing e-commerce codebase.
- Extracted prompts: 12
- Extracted activities: 12
- External source reference: `https://gitlab.aws.dev/enitin/amazon-bedrock-tutorials/-/tree/main/aidlc/workshops/brownfield-ecommerce-aidlc?ref_type=heads`

## Regeneration

Regenerate the workshop extraction after changing reconstructed pages:

```bash
node tools/extraction/extract-workshops.mjs
```
