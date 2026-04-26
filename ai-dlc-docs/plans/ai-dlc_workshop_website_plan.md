# AI-DLC Workshop Website Plan

## Understanding

We are creating a new GitHub-ready project for the website currently published at:

`https://d3h5h54wint40o.cloudfront.net/index.html`

The goal is to crawl and download the site, extract its design and layout, preserve or rebuild the public website locally, and organize workshop content for workshops 1 through 5 as maintainable subprojects. The local version should be hostable from Windows Subsystem for Linux using the Ubuntu installation, with a Java-based webserver serving the site.

The project should be organized so the downloaded source, cleaned website, workshop materials, tooling, and documentation are easy to commit, review, and evolve.

## Proposed Project Root

Project folder:

```text
ai-dlc-workshop/
```

Primary documentation path:

```text
ai-dlc-workshop/
  ai-dlc-docs/
    plans/
      ai-dlc_workshop_website_plan.md
```

## Recommended Repository Structure

```text
ai-dlc-workshop/
  README.md
  .gitignore
  LICENSE

  ai-dlc-docs/
    plans/
      ai-dlc_workshop_website_plan.md
    research/
      source-site-inventory.md
      design-layout-extraction.md
      workshop-content-map.md
    runbooks/
      local-wsl-ubuntu-hosting.md
      crawl-and-refresh-site.md

  source-mirror/
    raw/
      README.md
    manifests/
      crawl-manifest.json
      asset-inventory.json
      link-inventory.json

  website/
    public/
      index.html
      assets/
        css/
        js/
        images/
        fonts/
    src/
      styles/
      scripts/
      components/
    design/
      screenshots/
      extracted-tokens.json
      layout-notes.md

  workshops/
    workshop-01/
      README.md
      content/
      assets/
      exercises/
      solutions/
    workshop-02/
      README.md
      content/
      assets/
      exercises/
      solutions/
    workshop-03/
      README.md
      content/
      assets/
      exercises/
      solutions/
    workshop-04/
      README.md
      content/
      assets/
      exercises/
      solutions/
    workshop-05/
      README.md
      content/
      assets/
      exercises/
      solutions/

  server/
    java-static-server/
      README.md
      pom.xml
      src/
        main/
          java/
            com/
              aidlc/
                workshopsite/
                  StaticSiteServer.java

  tools/
    crawl/
      README.md
      crawl-site.ps1
      crawl-site.sh
    extraction/
      README.md
      extract-design-notes.md
```

## Site Crawl Plan

- [x] Create a controlled crawl of the CloudFront-hosted site.
- [x] Save an untouched mirror under `source-mirror/raw/`.
- [x] Generate crawl metadata under `source-mirror/manifests/`, including:
  - [x] downloaded pages
  - [x] CSS files
  - [x] JavaScript files
  - [x] images
  - [x] fonts
  - [x] external links
  - [x] missing or blocked assets
- [x] Keep the raw mirror separate from the cleaned local website so future crawls can be compared without overwriting intentional edits.
- [x] Normalize local paths in the working copy under `website/public/`.
- [x] Verify that `website/public/index.html` loads locally with all required assets.

Preferred crawl tools:

```text
wget
httrack
playwright-based crawler, if JavaScript rendering is required
```

Initial approach should start with `wget` or `httrack` from WSL. If the site relies heavily on client-side rendering, add a Playwright capture step.

## Design And Layout Extraction Plan

The design extraction should produce reusable documentation, not just copied files.

Capture and document:

- [x] page structure and navigation
- [x] typography
- [x] color palette
- [x] spacing system
- [x] major components
- [x] buttons and links
- [x] workshop cards or workshop navigation
- [x] responsive behavior
- [x] image and media usage
- [x] JavaScript-driven interactions

Recommended outputs:

```text
website/design/screenshots/
website/design/extracted-tokens.json
website/design/layout-notes.md
ai-dlc-docs/research/design-layout-extraction.md
```

The extracted design should help us either preserve the original static website or rebuild it cleanly using a more maintainable structure.

## Workshops 1-5 Extraction Plan

Workshop content should be split into five explicit subprojects:

```text
workshops/workshop-01/
workshops/workshop-02/
workshops/workshop-03/
workshops/workshop-04/
workshops/workshop-05/
```

For each workshop, extract:

- [x] title and summary
- [x] source page or source section
- [x] instructions
- [x] exercises
- [x] starter files
- [x] solution files, if present
- [x] images and supporting assets
- [x] external references
- [x] any scripts or code samples

Each workshop folder should have its own `README.md` with:

- [x] workshop purpose
- [x] prerequisites
- [x] how to run or view the material
- [x] folder contents
- [x] known dependencies

If the original site stores all workshop content in one page, we will split it into separate workshop folders while retaining source references in the research docs.

## Java Webserver Plan For WSL Ubuntu

The local webserver should live in:

```text
server/java-static-server/
```

Recommended implementation:

- [x] Java 21 or Java 17
- [x] Maven project
- [x] small static file server
- [x] default document root: `../../website/public`
- [x] default port: `8080`
- [x] configurable host, port, and document root through command-line arguments or environment variables

Example run target from WSL:

```bash
cd ai-dlc-workshop/server/java-static-server
mvn package
java -jar target/ai-dlc-static-server.jar --root ../../website/public --port 8080
```

Expected local URL:

```text
http://localhost:8080/
```

This keeps hosting independent from Node, Python, or editor tooling while still being simple to run on Ubuntu inside WSL.

## GitHub Readiness

Add repository hygiene early:

- [x] `README.md` with project purpose and quickstart
- [x] `.gitignore` for temporary crawl caches, build output, and local logs
- [x] docs for crawl refresh workflow
- [x] docs for WSL Java hosting
- [x] clear separation of raw mirrored content and curated website code

Recommended `.gitignore` categories:

```text
server/java-static-server/target/
*.log
.DS_Store
Thumbs.db
source-mirror/cache/
source-mirror/tmp/
```

We should decide after the first crawl whether `source-mirror/raw/` should be committed. If it contains large generated assets or third-party copyrighted material, it may be better to commit only manifests and the cleaned local website.

## Execution Phases

### Phase 1: Repository Setup

- [x] Create the project folder.
- [x] Add documentation structure.
- [x] Add the initial implementation plan.
- [x] Add baseline README and `.gitignore`.

### Phase 2: Source Site Crawl

- [x] Crawl `https://d3h5h54wint40o.cloudfront.net/index.html`.
- [x] Store the untouched mirror under `source-mirror/raw/`.
- [x] Create asset and link inventories.
- [x] Identify whether workshops 1-5 are static HTML, linked pages, embedded sections, or JavaScript-rendered content.

### Phase 3: Website Reconstruction

- [x] Copy or transform the usable site into `website/public/`.
- [x] Normalize asset paths for local hosting.
- [x] Preserve the original design and layout.
- [x] Add design extraction notes and document screenshot capture status.

### Phase 4: Workshop Organization

- [x] Split workshop content into `workshops/workshop-01` through `workshops/workshop-05`.
- [x] Add per-workshop README files.
- [x] Copy or reference workshop assets.
- [x] Document any missing or external-only resources.

### Phase 5: Java Static Server

- [x] Create the Java static server project.
- [x] Add Maven build configuration.
- [x] Serve `website/public`.
- [x] Add WSL Ubuntu run instructions.
- [x] Test at `http://localhost:8080/`.

### Phase 6: Verification

- [ ] Confirm local homepage renders.
- [ ] Confirm CSS, JavaScript, images, and fonts load locally.
- [ ] Confirm workshop links work.
- [ ] Confirm each workshop folder has usable documentation.
- [ ] Confirm Java server runs from WSL Ubuntu.

## Open Questions

- Should the raw downloaded mirror be committed, or should only curated website files and crawl manifests be committed?
- Should the local website remain a faithful static mirror, or should we refactor it into a cleaner component-based structure after extraction?
- Should workshop solution files be included if discovered, or separated from learner-facing content?
- Is Java 21 acceptable as the default runtime, or should the server target Java 17 for broader compatibility?

## Initial Acceptance Criteria

- [x] The project has a clear GitHub-ready folder structure.
- [x] The website can be served locally from WSL Ubuntu using a Java webserver.
- [x] The source site is crawled with a reproducible process.
- [x] Design and layout details are documented.
- [x] Workshops 1-5 are extracted into separate, organized folders.
- [x] The project includes runbooks for refreshing the crawl and running the local server.
