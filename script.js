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

// ----- full-width auto-advancing sliders (supports multiple, via data-group) -----
(function renderSliders() {
  if (typeof SLIDER_GROUPS === "undefined") return;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.querySelectorAll(".slider").forEach(function (container) {
    const photos = SLIDER_GROUPS[container.dataset.group];
    if (!photos || !photos.length) return;

    container.innerHTML = photos.map((file, i) => `
      <img src="assets/${file}" alt="" class="${i === 0 ? "active" : ""}" />
    `).join("");

    if (reduceMotion || photos.length < 2) return;

    const imgs = container.querySelectorAll("img");
    let current = 0;
    setInterval(function () {
      imgs[current].classList.remove("active");
      current = (current + 1) % imgs.length;
      imgs[current].classList.add("active");
    }, 3000);
  });
})();

// ----- polaroid scatter clusters -----
(function renderPolaroids() {
  if (typeof POLAROID_GROUPS === "undefined") return;
  document.querySelectorAll(".polaroid-scatter").forEach(function (el) {
    const group = POLAROID_GROUPS[el.dataset.group];
    if (!group) return;
    el.innerHTML = group.map(function (p) {
      return `
        <figure class="polaroid">
          <img src="assets/${p.file}" alt="" />
          ${p.caption ? `<figcaption>${p.caption}</figcaption>` : ""}
        </figure>
      `;
    }).join("");
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
// browser's tiny default per-notch scroll amount
(function setupAccomplishmentsScroll() {
  const box = document.getElementById("accomplishments-scroll");
  if (!box) return;
  box.addEventListener("wheel", function (e) {
    e.preventDefault();
    box.scrollTop += e.deltaY * 2.4;
  }, { passive: false });
})();

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
