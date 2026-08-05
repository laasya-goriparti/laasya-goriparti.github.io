<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>my story — laasya</title>
<script>
  (function () {
    var stored = localStorage.getItem("theme");
    document.documentElement.setAttribute("data-theme", stored || "dark");
  })();
</script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="styles.css" />
</head>
<body>
  <header class="nav">
    <a href="index.html" class="nav-brand">
      <span class="nav-mark" aria-hidden="true"></span>
      laasya
    </a>
    <nav class="nav-links">
      <button id="theme-toggle" class="theme-toggle" aria-label="toggle light/dark theme">◐</button>
      <div class="nav-menu">
        <button id="menu-toggle" class="menu-toggle" aria-label="open menu" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
        <div class="menu-dropdown" id="menu-dropdown">
          <a href="about.html">my story</a>
          <a href="journal.html">journey</a>
          <a href="research.html">research</a>
          <a href="projects.html">projects</a>
          <a href="press.html">press</a>
        </div>
      </div>
    </nav>
  </header>

  <main class="page">
    <p class="eyebrow">my story</p>
    <p style="color: var(--ink-soft);">coming soon.</p>

    <footer class="foot">
      <p>laasya, built with passion.</p>
    </footer>
  </main>

  <script src="script.js"></script>
</body>
</html>
