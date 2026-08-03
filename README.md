# laasya's site

Plain HTML/CSS/JS, no build step, no framework, no accounts required to edit.

## Pages

- `index.html` — home
- `about.html` ("my story" page — currently blank, coming soon), `research.html` (coming soon), `projects.html` (coming soon) — subpages
- `journal.html` — auto-populates from your Medium profile

Navigation is the ☰ icon in the top right of every page (opens a small
dropdown). To add another page later: create the new `.html` file (copy an
existing subpage as a starting point), then add one line to the dropdown
menu in **every** page's `<div class="menu-dropdown">` block, e.g.:
```html
<a href="newpage.html">new page</a>
```

## Data files (edit these, not the HTML, for routine updates)

- `accomplishments.js` — the scrollable "previously" list on the home page.
  Add a new line to the array to add an item.
- `photos.js` — the auto-sliding photo carousels (there are two on the home
  page right now, both pulling from the same `main` list). Add a filename
  to the list to add a slide; add a new named group + a new
  `<div class="slider" data-group="...">` in `index.html` to add a whole
  new slider elsewhere.
- `polaroids.js` — the scattered polaroid photo cluster. Same pattern as
  photos.js — add photos, or add a new group + a new
  `<div class="polaroid-scatter" data-group="...">` for another cluster.
- `journal.js` — set `MEDIUM_USERNAME` at the top to your Medium handle
  (the part after the @ in medium.com/@yourname) and the journal page will
  pull your articles automatically — thumbnail, short description, and
  link, no manual updates needed after that.

## Photo filenames

Use letters only (no hyphens, numbers, or spaces) if your phone's rename
tool restricts you — e.g. `sliderone.jpg`, `photoone.jpg`,
`polaroidone.jpg`. Keep the `.jpg` ending as-is. Put every photo in the
`assets/` folder.

## Design

- Font: EB Garamond everywhere, Georgia for the eyebrow/headings
- Dark/light mode: respects your system setting by default; the ◐ button
  in the nav lets you (or a visitor) override it, remembered via the
  browser's local storage
- Design tokens (colors, fonts) live at the top of `styles.css` under
  `:root` (light) and `html[data-theme="dark"]` (dark)

## To deploy — no Netlify, no credits, no CLI

**Cloudflare Pages** (recommended — free, no usage limits for a static site
like this):
1. Go to pages.cloudflare.com and sign in (free account)
2. Create a project → "Upload assets" (direct upload, no GitHub needed)
3. Drag this whole `portfolio-site` folder in
4. You get a live URL instantly; you can rename the project or attach a
   custom domain for free from the same dashboard

**GitHub Pages** (also free, works well if you're open to a GitHub
account):
1. Create a new repo on github.com, upload this folder's contents to it
   (drag-and-drop works in GitHub's web UI, no command line needed)
2. In the repo's Settings → Pages, set the source to your main branch
3. GitHub gives you a live URL in a minute or two

Both let you push updates any time by just re-uploading the changed files
— no credits, no rate limits for normal personal-site traffic.

## What changed in this round

- Removed the "field log" section entirely
- Rewrote the intro's second/third paragraphs with your new bio
- Nav is now a ☰ dropdown instead of plain text links, with journal and
  projects added
- New journal page, synced to Medium
- New projects page (stub, ready for you to fill in)
- "previously" is now a compact, scrollable list of every accomplishment
  you listed, with a fade at the top/bottom edges
- Current work reordered and updated per your latest notes; Epiphany and
  Koinz Capital moved out of current work (they still appear under
  "previously")
- Two full-width auto-sliding photo blocks instead of one static photo
