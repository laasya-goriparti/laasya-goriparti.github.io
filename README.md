# laasya's site

Plain HTML/CSS/JS, no build step, no framework, no accounts required to edit.

## Pages

- `index.html` — home
- `about.html` ("my story" — currently blank, coming soon)
- `research.html` (coming soon)
- `projects.html` (coming soon)
- `journal.html` — links out to your Medium profile

Navigation is the ☰ icon in the top right of every page (opens a small
dropdown). To add another page later: create the new `.html` file (copy an
existing subpage as a starting point), then add one line to the dropdown
menu in **every** page's `<div class="menu-dropdown">` block.

## Data files (edit these, not the HTML, for routine updates)

- **`accomplishments.js`** — the scrollable "previously" list. Add a line
  to the array to add an item.
- **`photos.js`** — the two full-width auto-sliding blocks near the top of
  the home page. `main` feeds the first one, `secondary` feeds the second.
  Add a filename to a group's list to add a slide. Broken/missing files are
  automatically skipped — no broken-image icon, it just moves to the next one.
- **`showcase.js`** — the horizontal scrolling carousel near the bottom
  (tilts on hover, like the reference site). Each entry can have:
  - `file` — image or short video clip in `assets/`
  - `link` — optional. If set, clicking the tile opens this URL (YouTube,
    Medium, Substack, etc.) in a new tab. Nothing shows that a link exists
    until it's clicked.
  - `caption` — optional short line under the tile.
  Portrait and landscape files each get their own uniform size
  automatically, so mixed orientations still line up cleanly.
- **`journal.js`** — `MEDIUM_USERNAME` is already set to `laasya.goriparti`.
  Nothing else to do here.

## Photos & videos: how sizing/orientation and broken files work

- Every image/video is checked before it's shown. If a file is missing, has
  the wrong extension, or fails to load for any reason, it's silently left
  out of the rotation/carousel — no broken-image icon, no gap, it just
  doesn't appear.
- Video clips work the same as photos — just use a `.mp4`, `.webm`, or
  `.mov` file instead of `.jpg`, in the same `photos.js`/`showcase.js` lists.
- **If a photo isn't showing up and you want to know why**, it's almost
  always one of these:
  1. **Filename typo or wrong case** — `assets/SliderOne.JPG` on your
     computer will not match `"sliderone.jpg"` in the code. GitHub Pages is
     case-sensitive.
  2. **Wrong extension** — if the actual file is a `.jpeg` or `.png` but the
     code says `.jpg`, it won't load. Check the real extension in your file
     browser (turn on "show file extensions" if your OS hides them).
  3. **File never actually uploaded** — check the repo's file list on
     github.com to confirm it's really there in `assets/`.
  4. **Browser cache** — hard refresh (Ctrl+Shift+R / Cmd+Shift+R) after any
     update, since browsers cache images aggressively.

## Design

- Font: EB Garamond everywhere, Georgia for the eyebrow/headings
- Dark/light mode: respects your system setting by default; the ◐ button
  in the nav lets you (or a visitor) override it, remembered locally
- Design tokens (colors, fonts) live at the top of `styles.css` under
  `:root` (light) and `html[data-theme="dark"]` (dark)
- "Currently" is now a set of sticky stacking cards — each one locks in
  place as you scroll and the next slides over it, like a deck of cards

## To deploy

**GitHub Pages** — since that's what you're using:
1. Download every file below (overwrite what's in your local folder)
2. Go to your repo on github.com → confirm `polaroids.js` is deleted if it's
   still there (it's replaced by `showcase.js` now) — delete it from the
   repo if so
3. "Add file" → "Upload files" → drag in the entire updated folder
   (all files + the `assets` folder together)
4. Commit, wait ~1 minute, then hard-refresh the live site

If anything ever looks broken or missing again, the most reliable fix is:
delete everything in the repo, then re-upload the complete current folder
from scratch. Partial uploads (just the "changed" files) are the most
common cause of things going wrong.
