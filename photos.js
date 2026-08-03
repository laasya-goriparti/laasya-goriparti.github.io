/*
  SLIDER PHOTOS — full-width blocks that auto-advance every 3 seconds.

  Each key below is a "group" of photos. Place a slider anywhere on the
  page with:
    <div class="slider" data-group="main"></div>

  To add a photo to an existing slider: put the file in assets/, then add
  its filename to that group's list below. Order in the list = slide order.

  To add a whole new slider (different photos) somewhere else on the page:
    1. add a new group below, e.g. SLIDER_GROUPS.campus = [ "photoa.jpg", "photob.jpg" ]
    2. in index.html, add <div class="slider" data-group="campus"></div>
       wherever you want it to appear.

  Filenames: use letters only (no hyphens/numbers) if your phone's rename
  tool requires it.
*/
const SLIDER_GROUPS = {
  main: [
    "slideroneone.jpg",
    "slideronetwo.jpg",
    "slideronethree.jpg",
    "slideronefour.jpg",
    "slideronefive.jpg",
    "slideronesix.jpg",
    "slideroneseven.jpg",
    "slideroneeight.jpg",
    "slideronenine.jpg",
    "slideroneten.jpg",
    "slideronezero.jpg"
  ],
  secondary: [
    "slidertwoone.jpg",
    "slidertwotwo.jpg"
  ]
};
