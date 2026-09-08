# Mechanical Engineering Portfolio — GitHub Pages

## Files
- `index.html` — main portfolio page
- `engme360.html` — detailed ENG ME 360 course-project portfolio page
- `style.css` — site and case-study styling
- `script.js` — navigation, scroll spy, typewriter, contact form, footer year
- `images/` — put your own images here when ready
- `resume.pdf` — put your resume here

## ENG ME 360 direct link
The course portfolio is intentionally a separate static page so it can be submitted directly:

`https://YOUR_USERNAME.github.io/YOUR_REPOSITORY/engme360.html`

For a user-site repository named `YOUR_USERNAME.github.io`, the URL becomes:

`https://YOUR_USERNAME.github.io/engme360.html`

## Replacing placeholders
Search for `Your Name`, `YOUR_EMAIL`, `YOUR_USERNAME`, and bracketed `[ ... ]` text in the HTML. The ENG ME 360 page includes empty figure boxes instead of generated images; replace those boxes with your own project photos, CAD renders, drawings, plots, and videos.

## Cache busting
The HTML references are versioned:

```html
<link rel="stylesheet" href="style.css?v=4">
<script src="script.js?v=4"></script>
```

When you make a CSS or JavaScript change that appears stuck in an old browser cache, increment the version number (`?v=5`, then `?v=6`, etc.) and push the commit. GitHub Pages will redeploy automatically. After deployment finishes, a hard refresh (`Ctrl+F5` on Windows, `Cmd+Shift+R` on macOS) can clear a local browser cache.
