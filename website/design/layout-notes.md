# Layout Notes

## Site Structure

The reconstructed site is a static Bootstrap 5 website. The public document root is `website/public/`.

- `index.html`: homepage with sticky navigation, hero, workshop cards, AI-DLC workflow overview, and footer.
- `task-manager.html`: Workshop 1 page.
- `job-application-cdk.html`: Workshop 2 page.
- `s3-file-sharing.html`: Workshop 3 page.
- `ecommerce-catalog.html`: Workshop 4 page.
- `brownfield-ecommerce.html`: Workshop 5 page.

## Navigation

The homepage uses in-page anchors for Home, Workshops, and Workflows. Workshop cards link to normalized static files instead of the source site's query-string URLs.

Workshop pages use a compact sticky navbar with a brand link and a Home link. Each page also includes a back button near the top of the content.

## Visual System

The visual language follows AWS-inspired colors:

- Dark header and hero backgrounds: `#16191F` and `#232F3E`
- Primary action color: `#FF9900`
- Info accents: `#146EB4` with `#E7F6FD` backgrounds
- Light content bands: `#EAEDED`

Typography uses the system UI stack from the shared CSS and Bootstrap's default type scale.

## Components

- Sticky Bootstrap navbar with Bootstrap Icons.
- Full-width dark hero on the homepage.
- Workshop cards with icon, title, summary, and full-width action button.
- Alert callouts for workflow guidance and prerequisites.
- Prompt boxes with dark background, preformatted text, and copy buttons.
- Bootstrap tab controls on workshop pages for workflow guidance and copy-paste prompts.
- Footer with dark background.

## Responsive Behavior

The site relies on Bootstrap's responsive grid and navbar collapse. Workshop cards use `.col-md-4` columns, so they collapse to single-column cards on small screens. The navbar switches to the Bootstrap hamburger menu on narrow viewports.

## Asset Notes

Local assets were normalized into:

- `website/public/assets/css/styles.css`
- `website/public/assets/js/*.js`

Bootstrap CSS, Bootstrap JavaScript, and Bootstrap Icons remain external CDN dependencies for Phase 3. A later phase can vendor these assets if fully offline local hosting is required.
