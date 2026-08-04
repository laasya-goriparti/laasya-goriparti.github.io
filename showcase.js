/*
  SHOWCASE — the horizontal scrolling carousel near the bottom of the home
  page (replaces the old polaroid scatter).

  Each item:
    file    — the filename in assets/ (image or short video clip both work
              — .jpg/.png/.webp for photos, .mp4/.webm/.mov for video clips)
    link    — optional. If set, the whole tile becomes clickable and opens
              this URL in a new tab (a YouTube video, Medium article,
              Substack post, etc. recapping that moment). Leave as "" for
              no link — nothing about the link shows unless you click it.
    caption — optional. A short line shown under the tile. Leave as "" for
              none.

  Sizing is automatic: portrait photos/clips get one uniform size, landscape
  ones get another, so everything flows evenly even when mixed. Broken or
  missing files are skipped automatically — they just won't appear.

  To add more: copy a line and fill it in. Order in the list = left-to-right
  order in the carousel.
*/
const SHOWCASE_ITEMS = [
  { file: "showcaseone.jpg", link: "", caption: "" },
  { file: "showcasetwo.jpg", link: "", caption: "" },
  { file: "showcasethree.jpg", link: "", caption: "" }
];
