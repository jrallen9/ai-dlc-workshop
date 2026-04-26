# Design Layout Extraction

## Phase 3 Findings

The source site is a static Bootstrap 5 implementation with a small amount of page-specific JavaScript. No image assets were referenced by the crawled pages. Visual interest is provided through Bootstrap Icons, cards, color blocks, tabs, alerts, and prompt-code panels.

## Primary Layout

The homepage structure is:

1. Sticky dark navbar.
2. Dark gradient hero with centered title, supporting copy, and two CTAs.
3. Workshop card grid with five workshop cards.
4. Workflow overview section with text, feature list, GitHub/documentation buttons, and a large Bootstrap Icon visual.
5. Dark footer.

Workshop pages share this structure:

1. Sticky navbar.
2. Light-gray workshop detail section.
3. Back button.
4. Page heading and lead text.
5. White overview panel.
6. Bootstrap tab interface for AI-DLC Workflow and copy-paste prompts.
7. Prompt/code panels with copy buttons.
8. Footer.

## Design Tokens

Detailed tokens are stored in `website/design/extracted-tokens.json`.

Key colors:

- AWS orange: `#FF9900`
- AWS squid ink: `#16191F`
- AWS dark: `#232F3E`
- AWS light: `#EAEDED`
- AWS blue: `#146EB4`

## Reconstruction Notes

Phase 3 normalized the source site's query-string workshop URLs into stable static files:

| Source URL | Local page |
| --- | --- |
| `task-manager.html?workshop=1` | `task-manager.html` |
| `job-application-cdk.html?workshop=2` | `job-application-cdk.html` |
| `s3-file-sharing.html?workshop=3` | `s3-file-sharing.html` |
| `ecommerce-catalog.html?workshop=4` | `ecommerce-catalog.html` |
| `brownfield-ecommerce.html?workshop=5` | `brownfield-ecommerce.html` |

Local CSS and JavaScript references were moved under `assets/css/` and `assets/js/`.

## Screenshots

Screenshot capture is deferred until the Java static server is available or a browser automation runtime is added. The reconstructed pages are static and can be opened directly from `website/public/index.html` for manual inspection.
