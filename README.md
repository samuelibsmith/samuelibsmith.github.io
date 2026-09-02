# Samuel Smith Portfolio — Alloy + Signal / Light-Dark Mode

This version uses Alloy + Signal as the dark theme and a crisp white / blue / red light theme.

## Theme behavior
- Default: follows the visitor's system/browser `prefers-color-scheme` setting.
- Manual override: `AUTO`, `LIGHT`, or `DARK` in the header.
- Manual choice is saved in localStorage under `portfolio-theme`.
- Choosing `AUTO` returns control to the system/browser setting.

## Project case-study links
The old `view case study` controls pointed to `#`, which only returned visitors to the top of the page. They are now intentionally shown as `case study coming soon` until individual case-study pages exist.

When a project page is ready, replace the inactive span with a normal link such as:
`<a href="projects/project-one.html" class="project-link">view case study <span>↗</span></a>`

## Project images
Replace the placeholder files in `images/` with real project images while preserving the filenames, or update the image `src` values in `index.html`.
