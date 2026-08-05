/*
  JOURNEY — auto-populates from Substack and Medium feeds, rendered as
  sticky-stacking cards (same visual motion as the "currently" section on
  the home page).

  Substack: uses the free rss2json.com API to read the public RSS feed
  (same approach as Medium, since browsers can't fetch either feed
  directly due to CORS). Substack publications are normally served at
  https://YOURSUBDOMAIN.substack.com/feed — set SUBSTACK_FEED_URL below.

  NOTE: your substack link was given as substack.com/@blackswan075 — that
  profile URL usually forwards to a subdomain like blackswan075.substack.com.
  I've set the feed to that guess below; if the newsletter section shows
  nothing, double-check your actual publication subdomain (visit your
  substack in a browser and look at the URL) and update SUBSTACK_FEED_URL.

  Medium: username below is the part after the @ in medium.com/@username.
*/
const SUBSTACK_FEED_URL = "https://blackswan075.substack.com/feed";
const MEDIUM_USERNAME = "laasya.goriparti";

function stripHtml(html) {
  return html ? html.replace(/<[^>]+>/g, "").trim() : "";
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long", day: "numeric", year: "numeric"
  }).toLowerCase();
}

// pulls the first <img> out of an item's content when no explicit
// thumbnail field is provided (Substack's rss2json response often needs this)
function extractFirstImage(item) {
  if (item.thumbnail) return item.thumbnail;
  const match = (item.content || item.description || "").match(/<img[^>]+src="([^">]+)"/);
  return match ? match[1] : "";
}

async function fetchFeed(feedUrl) {
  const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedUrl)}`;
  const res = await fetch(apiUrl);
  const data = await res.json();
  if (data.status !== "ok" || !data.items || !data.items.length) return [];
  return data.items;
}

function renderArticleStack(containerId, items, emptyMessage) {
  const wrap = document.getElementById(containerId);
  if (!wrap) return;

  if (!items.length) {
    wrap.innerHTML = `<p class="journal-empty">${emptyMessage}</p>`;
    return;
  }

  wrap.innerHTML = items.map(function (item, i) {
    const thumb = extractFirstImage(item);
    const desc = stripHtml(item.description).slice(0, 140);
    return `
      <a class="article-stack-card" style="--i:${i}" href="${item.link}" target="_blank" rel="noopener">
        ${thumb ? `<div class="article-stack-thumb" style="background-image:url('${thumb}')"></div>` : ""}
        <div class="article-stack-body">
          <p class="article-stack-date">${formatDate(item.pubDate)}</p>
          <h3 class="article-stack-title">${item.title}</h3>
          <p class="article-stack-desc">${desc}${desc.length === 140 ? "…" : ""}</p>
        </div>
      </a>
    `;
  }).join("");
}

(async function loadSubstack() {
  const wrap = document.getElementById("substack-stack");
  if (!wrap) return;
  wrap.innerHTML = `<p class="journal-empty">loading newsletter editions…</p>`;
  try {
    const items = await fetchFeed(SUBSTACK_FEED_URL);
    renderArticleStack(
      "substack-stack",
      items,
      "couldn't load substack editions right now — double check SUBSTACK_FEED_URL in journal.js matches your actual publication address."
    );
  } catch (err) {
    wrap.innerHTML = `<p class="journal-empty">couldn't load substack editions right now — try refreshing.</p>`;
  }
})();

(async function loadMedium() {
  const wrap = document.getElementById("medium-stack");
  if (!wrap) return;

  if (!MEDIUM_USERNAME || MEDIUM_USERNAME.startsWith("REPLACE_WITH")) {
    wrap.innerHTML = `<p class="journal-empty">add your Medium username at the top of journal.js to sync your articles here.</p>`;
    return;
  }

  wrap.innerHTML = `<p class="journal-empty">loading articles…</p>`;
  const feedUrl = `https://medium.com/feed/@${MEDIUM_USERNAME}`;

  try {
    const items = await fetchFeed(feedUrl);
    renderArticleStack(
      "medium-stack",
      items,
      "couldn't load Medium articles right now — double check the username in journal.js."
    );
  } catch (err) {
    wrap.innerHTML = `<p class="journal-empty">couldn't load Medium articles right now — try refreshing.</p>`;
  }
})();
