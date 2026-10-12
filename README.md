# Zirdi Syukur — personal website

This repository contains the static source for [zirdisyukur.github.io](https://zirdisyukur.github.io/).
The site has no application build step; GitHub Pages serves the HTML, stylesheets, scripts, and media
files directly.

## Where to make changes

| Area | Main files | Notes |
| --- | --- | --- |
| Main portfolio | `index.html` | Home, biography, research summaries, CV, publications, other work, and contact. Sections have HTML comments for navigation. |
| Main site styles | `assets/sass/main.scss` | Source stylesheet. Keep its published counterpart, `assets/css/main.css`, in sync when changing styles. |
| Main site behavior | `assets/js/main.js` | Navigation, research photo gallery, publication viewer, filters, and responsive header behavior. |
| Research notebook | `quantum-research-notebook.html` | Research landing page and project directory. |
| Individual project pages | `research/projects/*.html` | One page per project, using shared `research/research.css`. |
| Research site styles | `research/research.css` | Shared layout, cards, detail pages, and responsive rules for the notebook. |
| Images and icons | `images/` | Portfolio photos, research figures, and reusable project illustrations. |
| Downloadable materials | repository root, `reports/`, `research/assets/` | PDFs, presentations, and other files linked from the site. |
| Archived CV copies | `legacy/`, `outdatedcv/` | Older CV versions retained for reference. |

## Editing conventions

- Preserve the existing public file paths when possible; links are relative and case-sensitive.
- Add images and project-specific downloads to the existing folders and reference them from the
  relevant HTML page.
- Treat `assets/js/*.min.js` and Font Awesome's generated assets as third-party vendor files. Make
  site behavior changes in `assets/js/main.js`.
- Keep the source Sass and the published CSS aligned when editing the main site's styles.
- `docs/asset-audit.md` records files that appear unused in a static reference scan. It is a review
  list, not a deletion list: confirm the intended use before removing anything.
