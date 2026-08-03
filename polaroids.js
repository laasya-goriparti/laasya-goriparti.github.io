/*
  POLAROID PHOTOS — scattered, slightly tilted photo clusters.
  You can have more than one cluster on the page (e.g. one near the top,
  another lower down) — each one is a "group" below, placed in the HTML
  with: <div class="polaroid-scatter" data-group="main"></div>

  To add a photo to an existing group: add a new { file, caption } line.
  To add a whole new scattered cluster somewhere else on the page:
    1. add a new group below, e.g. POLAROID_GROUPS.summer = [ ... ]
    2. in index.html, add <div class="polaroid-scatter" data-group="summer"></div>
       wherever you want that cluster to appear.
  caption is optional — leave it as "" if you don't want one.
*/
const POLAROID_GROUPS = {
  main: [
    { file: "polaroidone.jpg", caption: "" },
    { file: "polaroidtwo.jpg", caption: "" },
    { file: "polaroidthree.jpg", caption: "" }
  ]
};
