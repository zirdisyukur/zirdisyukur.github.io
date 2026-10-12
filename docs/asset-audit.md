# Asset audit

This is a preliminary static scan of local media references from HTML, CSS, Sass, and JavaScript.
It searches source text for each asset filename. It can miss dynamically generated references and
cannot determine whether an unreferenced file is intentionally kept as an archive or source material.
Review these candidates before deleting anything.

## Files with no detected source reference

- `images/avatar.jpg` and `images/avatar_square.jpeg` — alternate profile images; the live pages use
  `images/mzs-profile.png` and `images/avatar.jpeg`.
- `images/banner.jpg` — older banner image; the current main page uses `images/pic02.jpg`, and the
  research notebook uses `images/quantum-lab-banner.jpeg`.
- `images/earth.jpeg` — no current page reference found.
- `images/goodReads.heic` — the site uses the converted `images/goodReads.png` instead.
- `images/gutiar.png` — likely an older or misspelled guitar image; the guitar tile uses
  `images/guitar.jpeg`.
- `images/IMG_8601.jpeg`, `images/pic08.jpg`, and `images/BCMathematica.pdf` — no current page
  reference found.
- `images/qinc-logo.png` — the magnetometer project page uses `images/qinc-logo.webp`.
- `assets/css/images/ie/grad0-15.svg` — no direct reference found in source stylesheets.
- `cv_old.pdf` and `cv_old2.pdf` at the repository root, along with old copies under `legacy/` and
  `outdatedcv/` — filenames suggest archival CV versions; confirm before cleanup.
- `README.txt` — duplicates the short former README content and can be removed once no external
  workflow depends on it.

## Notes

The scan found references for the remaining site images, project illustrations, current CV links,
project poster, reports, and Font Awesome font formats. The duplicate CV directories appear to be
historical archives; their presence is documented rather than changed here.
