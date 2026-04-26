# Source Site Inventory

Generated from the Phase 2 crawl of:

`https://d3h5h54wint40o.cloudfront.net/index.html`

## Summary

- Crawl date: 2026-04-25
- Downloaded files: 14
- HTML pages: 7
- Local CSS files: 1
- Local JavaScript files: 6
- Missing local assets: 0
- Missing local links: 0
- External dependencies: Bootstrap 5.3.2 and Bootstrap Icons 1.11.3 from jsDelivr

## Downloaded Pages

| Page | Source URL | Notes |
| --- | --- | --- |
| Home | `https://d3h5h54wint40o.cloudfront.net/index.html` | Landing page with workshop cards and workflow section. |
| Register Interest | `https://d3h5h54wint40o.cloudfront.net/register.html` | Static interest form wired to local `register.js`. |
| Workshop 1: Task Manager Application | `https://d3h5h54wint40o.cloudfront.net/task-manager.html?workshop=1` | Static HTML workshop page with Bootstrap tabs. |
| Workshop 2: Job Application Website with CDK | `https://d3h5h54wint40o.cloudfront.net/job-application-cdk.html?workshop=2` | Static HTML workshop page with Bootstrap tabs. |
| Workshop 3: S3 File-Sharing System | `https://d3h5h54wint40o.cloudfront.net/s3-file-sharing.html?workshop=3` | Static HTML workshop page with Bootstrap tabs and vision download JavaScript. |
| Workshop 4: E-Commerce Product Catalog | `https://d3h5h54wint40o.cloudfront.net/ecommerce-catalog.html?workshop=4` | Static HTML workshop page with Bootstrap tabs. |
| Workshop 5: Brownfield E-Commerce Modernization | `https://d3h5h54wint40o.cloudfront.net/brownfield-ecommerce.html?workshop=5` | Static HTML workshop page with inline workshop-number script. |

## Local Assets

| Asset | Type | Notes |
| --- | --- | --- |
| `styles.css` | CSS | Shared site and workshop styling. |
| `script.js` | JavaScript | Home-page workshop rendering helpers and legacy embedded workshop data. |
| `register.js` | JavaScript | Registration form behavior. |
| `task-manager.js` | JavaScript | Workshop number display and prompt copy helpers. |
| `job-application-cdk.js` | JavaScript | Same hash as `task-manager.js`; workshop number display and prompt copy helpers. |
| `s3-file-sharing.js` | JavaScript | Vision download, workshop number display, and prompt copy helpers. |
| `ecommerce-catalog.js` | JavaScript | Workshop number display and prompt copy helpers. |

## Workshop Content Shape

Workshop 1 through Workshop 5 are static HTML pages, not JavaScript-rendered routes. Each workshop is linked from `index.html` with a query string, and the corresponding local mirror file is named with the query string plus `.html`, for example `task-manager.html?workshop=1.html`.

This shape means Phase 3 can reconstruct the public site by copying the HTML/CSS/JS into `website/public/` and normalizing query-string filenames to stable local paths.

## External Links

The crawl found external links to:

- `https://github.com/awslabs/aidlc-workflows`
- `https://github.com/awslabs/aidlc-workflows#readme`
- `https://github.com/awslabs/aidlc-workflows#quick-start`
- `https://gitlab.aws.dev/enitin/amazon-bedrock-tutorials/-/tree/main/aidlc/workshops/brownfield-ecommerce-aidlc?ref_type=heads`

See `source-mirror/manifests/link-inventory.json` for the complete link inventory.
