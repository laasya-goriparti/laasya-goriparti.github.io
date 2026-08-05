// ----- shared helper: check a file exists before showing it, detect video vs
// image, and detect portrait vs landscape orientation. Broken/missing files
// resolve with ok:false and just get skipped wherever they're used. -----
function preloadMedia(file) {
  return new Promise(function (resolve) {
    const isVideo = /\.(mp4|webm|mov)$/i.test(file);
    const src = `assets/${file}`;

    if (isVideo) {
      const v = document.createElement("video");
      v.preload = "metadata";
      v.onloadedmetadata = function () {
        resolve({
          file: file,
          ok: true,
          isVideo: true,
          orientation: v.videoWidth >= v.videoHeight ? "landscape" : "portrait"
        });
      };
      v.onerror = function () {
        resolve({ file: file, ok: false, isVideo: true, orientation: null });
      };
      v.src = src;
    } else {
      const img = new Image();
      img.onload = function () {
        resolve({
          file: file,
          ok: true,
          isVideo: false,
          orientation: img.naturalWidth >= img.naturalHeight ? "landscape" : "portrait"
        });
      };
      img.onerror = function () {
        resolve({ file: file, ok: false, isVideo: false, orientation: null });
      };
      img.src = src;
    }
  });
}

// ----- shared sound state for the hero video (persisted, default muted) -----
const soundState = { on: localStorage.getItem("soundOn") === "true" };
function applySoundToHeroVideos() {
  document.querySelectorAll("#hero-media video").forEach(function (v) {
    v.muted = !soundState.on;
  });
}

// ----- intro paragraphs fade in as you scroll to them -----
(function setupIntroFade() {
  const paragraphs = document.querySelectorAll(".intro p");
  if (!paragraphs.length) return;

  if (!("IntersectionObserver" in window)) {
    paragraphs.forEach(p => p.classList.add("in-view"));
    return;
  }

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -10% 0px" });

  paragraphs.forEach(p => observer.observe(p));
})();

// ----- full-width auto-advancing sliders (supports multiple, via data-group,
// skips any broken/missing files, supports video clips) -----
(async function renderSliders() {
  if (typeof SLIDER_GROUPS === "undefined") return;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const containers = document.querySelectorAll(".slider");

  for (const container of containers) {
    const files = SLIDER_GROUPS[container.dataset.group];
    if (!files || !files.length) continue;

    const results = await Promise.all(files.map(preloadMedia));
    const valid = results.filter(r => r.ok);
    if (!valid.length) continue;

    container.innerHTML = valid.map(function (r, i) {
      const activeClass = i === 0 ? "active" : "";
      return r.isVideo
        ? `<video src="assets/${r.file}" class="${activeClass}" autoplay muted loop playsinline></video>`
        : `<img src="assets/${r.file}" class="${activeClass}" alt="" />`;
    }).join("");

    if (container.id === "hero-media") applySoundToHeroVideos();

    if (reduceMotion || valid.length < 2) continue;

    const nodes = container.querySelectorAll("img, video");
    let current = 0;
    setInterval(function () {
      nodes[current].classList.remove("active");
      current = (current + 1) % nodes.length;
      nodes[current].classList.add("active");
    }, 3000);
  }
})();

// ----- showcase carousel: uniform sizing by orientation, optional links,
// optional captions, hover tilt, skips broken/missing files, supports video -----
(async function renderShowcase() {
  const track = document.getElementById("showcase-track");
  if (!track || typeof SHOWCASE_ITEMS === "undefined") return;

  const results = await Promise.all(SHOWCASE_ITEMS.map(function (item) {
    return preloadMedia(item.file).then(function (r) {
      return Object.assign({}, r, { link: item.link, caption: item.caption });
    });
  }));

  const valid = results.filter(r => r.ok);
  if (!valid.length) return;

  track.innerHTML = valid.map(function (r) {
    const sizeClass = r.orientation === "portrait" ? "showcase-portrait" : "showcase-landscape";
    const mediaTag = r.isVideo
      ? `<video src="assets/${r.file}" autoplay muted loop playsinline></video>`
      : `<img src="assets/${r.file}" alt="" />`;
    const inner = `
      <div class="showcase-item ${sizeClass}">${mediaTag}</div>
      ${r.caption ? `<p class="showcase-caption">${r.caption}</p>` : ""}
    `;
    return r.link
      ? `<a class="showcase-tile" href="${r.link}" target="_blank" rel="noopener">${inner}</a>`
      : `<div class="showcase-tile">${inner}</div>`;
  }).join("");

  // subtle cursor-following tilt on hover, matches the reference site
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) return;

  track.querySelectorAll(".showcase-tile").forEach(function (tile) {
    tile.addEventListener("mousemove", function (e) {
      const rect = tile.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      tile.style.transform = `perspective(700px) rotateY(${x * 14}deg) rotateX(${-y * 14}deg) scale(1.04)`;
    });
    tile.addEventListener("mouseleave", function () {
      tile.style.transform = "";
    });
  });
})();

// ----- accomplishments scroll list -----
(function renderAccomplishments() {
  const list = document.getElementById("accomplishments-list");
  if (!list || typeof ACCOMPLISHMENTS === "undefined") return;
  list.innerHTML = ACCOMPLISHMENTS.map(function (item) {
    return `<li>${item}</li>`;
  }).join("");
})();

// makes scrolling the accomplishments box feel faster/easier than the
// browser's tiny default per-notch scroll amount, on top of the auto-scroll
// set up below
(function setupAccomplishmentsScroll() {
  const box = document.getElementById("accomplishments-scroll");
  if (!box) return;
  box.addEventListener("wheel", function (e) {
    e.preventDefault();
    box.scrollTop += e.deltaY * 2.4;
    notifyManualScroll(box);
  }, { passive: false });
})();

// ----- generic auto-scroll helper: slowly scrolls a container, pauses when
// the person interacts manually (drag/scrollbar/wheel/touch), resumes a
// beat later. Works for both the vertical accomplishments list and the
// horizontal showcase carousel. -----
const autoScrollPauseUntil = new WeakMap();
function notifyManualScroll(el) {
  autoScrollPauseUntil.set(el, Date.now() + 2800);
}
function setupAutoScroll(el, axis, speed) {
  if (!el) return;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) return;

  ["wheel", "touchstart", "mousedown"].forEach(function (evt) {
    el.addEventListener(evt, function () { notifyManualScroll(el); }, { passive: true });
  });

  let last = null;
  function step(ts) {
    if (last === null) last = ts;
    const dt = ts - last;
    last = ts;

    const pausedUntil = autoScrollPauseUntil.get(el) || 0;
    if (Date.now() >= pausedUntil) {
      const maxScroll = axis === "x"
        ? el.scrollWidth - el.clientWidth
        : el.scrollHeight - el.clientHeight;

      if (maxScroll > 1) {
        const delta = (speed * dt) / 1000;
        if (axis === "x") {
          if (el.scrollLeft >= maxScroll - 1) el.scrollLeft = 0;
          else el.scrollLeft += delta;
        } else {
          if (el.scrollTop >= maxScroll - 1) el.scrollTop = 0;
          else el.scrollTop += delta;
        }
      }
    }
    requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

setupAutoScroll(document.getElementById("accomplishments-scroll"), "y", 28);
setupAutoScroll(document.querySelector(".showcase-carousel"), "x", 28);

// ----- hamburger nav menu -----
(function setupMenu() {
  const btn = document.getElementById("menu-toggle");
  const dropdown = document.getElementById("menu-dropdown");
  if (!btn || !dropdown) return;

  btn.addEventListener("click", function (e) {
    e.stopPropagation();
    const isOpen = dropdown.classList.toggle("open");
    btn.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  document.addEventListener("click", function (e) {
    if (!dropdown.contains(e.target) && e.target !== btn) {
      dropdown.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
    }
  });
})();

// ----- theme toggle -----
(function setupThemeToggle() {
  const btn = document.getElementById("theme-toggle");
  if (!btn) return;
  btn.addEventListener("click", function () {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  });
})();

// ----- sound toggle (hero video only; defaults to muted) -----
// simple minimalist speaker icons, drawn as inline SVG so they always match
// the site's line-based icon style instead of relying on emoji rendering
const SOUND_ICON_ON = `<svg viewBox="0 0 24 24" fill="none"><path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor"/><path d="M16.5 8.5a5 5 0 0 1 0 7" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M19 6a9 9 0 0 1 0 12" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`;
const SOUND_ICON_OFF = `<svg viewBox="0 0 24 24" fill="none"><path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor"/><path d="M16 9l5 6M21 9l-5 6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`;

(function setupSoundToggle() {
  const btn = document.getElementById("sound-toggle");
  if (!btn) return;

  function updateIcon() {
    btn.innerHTML = soundState.on ? SOUND_ICON_ON : SOUND_ICON_OFF;
    btn.setAttribute("aria-label", soundState.on ? "mute video sound" : "unmute video sound");
  }
  updateIcon();

  btn.addEventListener("click", function () {
    soundState.on = !soundState.on;
    localStorage.setItem("soundOn", soundState.on ? "true" : "false");
    updateIcon();
    applySoundToHeroVideos();
  });
})();

// ----- today's date in the eyebrow -----
(function setToday() {
  const el = document.getElementById("today");
  if (!el) return;
  const d = new Date();
  el.textContent = d.toLocaleDateString("en-US", {
    month: "long", day: "numeric", year: "numeric"
  }).toLowerCase();
})();

// ----- ask form: opens a prefilled email (no backend needed) -----
(function setupAsk() {
  const form = document.getElementById("ask-form");
  const input = document.getElementById("ask-input");
  const note = document.getElementById("ask-note");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const question = input.value.trim();
    if (!question) {
      note.textContent = "write something first.";
      return;
    }
    const subject = encodeURIComponent("question from your site");
    const body = encodeURIComponent(question);
    window.location.href = `mailto:laasya.goriparti@gmail.com?subject=${subject}&body=${body}`;
    note.textContent = "opening your email client...";
    input.value = "";
  });
})();
