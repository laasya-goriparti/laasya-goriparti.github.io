/*
  JOURNAL — auto-populates from your Medium profile.

  1. Set your Medium username below (the part after the @ in
     medium.com/@yourusername).
  2. That's it — this fetches your public RSS feed and renders a card for
     each article with its thumbnail, a short description, and a link.

  Uses the free rss2json.com API to read the feed in the browser (Medium's
  own feed blocks direct browser requests). No account/key needed for
  normal personal-site traffic, but if you ever hit a rate limit, rss2json
  has a free API key you can add to the URL below.
*/
const MEDIUM_USERNAME = "laasya.goriparti";

(async function loadJournal() {
  const grid = document.getElementById("journal-grid");
  if (!grid) return;

  if (!MEDIUM_USERNAME || MEDIUM_USERNAME.startsWith("REPLACE_WITH")) {
    grid.innerHTML = `<p class="journal-empty">add your Medium username at the top of journal.js to sync your articles here.</p>`;
    return;
  }

  const feedUrl = `https://medium.com/feed/@${MEDIUM_USERNAME}`;
  const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedUrl)}`;

  grid.innerHTML = `<p class="journal-empty">loading articles…</p>`;

  try {
    const res = await fetch(apiUrl);
    const data = await res.json();

    if (data.status !== "ok" || !data.items || !data.items.length) {
      grid.innerHTML = `<p class="journal-empty">couldn't load Medium articles right now — double check the username in journal.js.</p>`;
      return;
    }

    grid.innerHTML = data.items.map(function (item) {
      const desc = item.description
        ? item.description.replace(/<[^>]+>/g, "").trim().slice(0, 160) + "…"
        : "";
      const thumb = item.thumbnail || "";
      const date = new Date(item.pubDate).toLocaleDateString("en-US", {
        month: "long", day: "numeric", year: "numeric"
      }).toLowerCase();

      return `
        <a class="journal-card" href="${item.link}" target="_blank" rel="noopener">
          ${thumb ? `<div class="journal-thumb" style="background-image:url('${thumb}')"></div>` : ""}
          <div class="journal-card-body">
            <p class="journal-date">${date}</p>
            <h3 class="journal-title">${item.title}</h3>
            <p class="journal-desc">${desc}</p>
          </div>
        </a>
      `;
    }).join("");
  } catch (err) {
    grid.innerHTML = `<p class="journal-empty">couldn't load Medium articles right now — try refreshing.</p>`;
  }
})();
