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
// NOTE: you mentioned attaching the specific names + captions of the 3
// images you want here right now, but that attachment didn't come through
// on my end — only your message text did. Left the existing 4 items in
// place below; send over that list (or just edit directly here) and I'll
// swap them in.
const SHOWCASE_ITEMS = [
  { file: "showcaseone.jpg", link: "", caption: "women founders dinner w/ foundess @ sxsw" },
  { file: "showcasetwo.jpg", link: "", caption: "hosted art therapy @ special needs care homes" },
  { file: "showcasethree.jpg", link: "", caption: "hosted hackerhouse @ a16z sf tech week" },
  { file: "showcasefour.jpg", link: "", caption: "hosted mixer w/ neuronyc @ ny tech week" },
];
