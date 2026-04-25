# AI-DLC Workshop

This repository contains the local, GitHub-ready version of the AI-DLC workshop website project.

The project will crawl the source website, extract its design and layout, organize workshops 1 through 5 into maintainable subprojects, and serve the local website from WSL Ubuntu with a Java static webserver.

## Source Site

```text
https://d3h5h54wint40o.cloudfront.net/index.html
```

## Repository Layout

```text
ai-dlc-docs/
  plans/       Project plans and implementation tracking
  research/    Crawl, design, and workshop extraction notes
  runbooks/    Repeatable local workflows

source-mirror/
  raw/         Untouched downloaded mirror of the source site
  manifests/   Crawl, asset, and link inventories

website/
  public/      Locally hostable static website
  src/         Curated source files if the site is reconstructed
  design/      Screenshots, tokens, and layout notes

workshops/
  workshop-01/ Workshop 1 materials
  workshop-02/ Workshop 2 materials
  workshop-03/ Workshop 3 materials
  workshop-04/ Workshop 4 materials
  workshop-05/ Workshop 5 materials

server/
  java-static-server/ Java server for local WSL Ubuntu hosting

tools/
  crawl/       Site crawl scripts
  extraction/  Design and content extraction helpers
```

## Quickstart

Phase 1 repository setup is documented in:

```text
ai-dlc-docs/plans/ai-dlc_workshop_website_plan.md
```

Future phases will add:

- source site crawl scripts
- local website files
- workshop extraction outputs
- Java webserver implementation
- WSL Ubuntu run instructions
