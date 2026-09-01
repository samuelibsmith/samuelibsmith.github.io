MECHANICAL ENGINEERING PORTFOLIO — GITHUB PAGES

FILES
- index.html        Main portfolio page
- style.css         Mechanical-engineering visual styling
- script.js         Typewriter, mobile navigation, scroll spy, contact mailto, footer year
- resume.pdf        Add your resume PDF in the repository root
- .nojekyll         Prevents Jekyll processing for this plain static site

BEFORE PUBLISHING
1. In index.html, replace Your Name, YOUR_EMAIL@example.com, YOUR_USERNAME, location, degree, graduation date, and project content.
2. Add resume.pdf to the repository root, or change each resume.pdf link to the filename you use.
3. Replace the three project case-study # links with your project pages, PDFs, or image galleries.
4. Replace any placeholder project visuals with your CAD renders, drawings, FEA plots, prototype photos, or test results.

GITHUB PAGES — SIMPLE SETUP
1. Create/use a GitHub repository.
2. Put index.html, style.css, script.js, .nojekyll, resume.pdf, and your images/assets in the repository.
3. Push them to the main branch.
4. Open Settings > Pages.
5. Under Build and deployment, choose "Deploy from a branch".
6. Select main and /(root), then Save.

For a personal site, the repository can be named USERNAME.github.io. For a project site, the URL includes the repository name.


CACHE MANAGEMENT (GitHub Pages)
==============================
This site uses cache-busting version numbers in index.html:
- style.css?v=3
- script.js?v=3

When making future CSS or JavaScript changes, increment the version number (for example v=4). This forces browsers to request the newest file instead of using an older cached copy.

After pushing changes to GitHub:
1. Wait for GitHub Pages deployment to complete.
2. Hard refresh your browser:
   Windows: Ctrl + F5
   Mac: Cmd + Shift + R
3. If needed, test in an incognito/private window.
