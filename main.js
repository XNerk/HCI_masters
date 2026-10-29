// ══════════════════════════════════════════
//  BINARY RAIN + SHARED JS
// ══════════════════════════════════════════

(function () {
  "use strict";

  // ── BINARY RAIN ──────────────────────────
  const canvas = document.getElementById("binary-canvas");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let W, H, cols, drops;

    const chars = "01";
    const fontSize = 13;
    const green = "#00ff41";

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      cols = Math.floor(W / fontSize);
      drops = Array(cols).fill(1);
    }

    resize();
    window.addEventListener("resize", resize);

    function draw() {
      ctx.fillStyle = "rgba(1, 11, 1, 0.06)";
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = green;
      ctx.font = fontSize + "px 'Share Tech Mono', monospace";

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Vary brightness
        const alpha = Math.random() > 0.9 ? 1 : 0.6 + Math.random() * 0.3;
        ctx.globalAlpha = alpha;
        ctx.fillText(char, x, y);
        ctx.globalAlpha = 1;

        if (y > H && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    }

    setInterval(draw, 55);
  }

  // ── ANIMATED COUNTERS ────────────────────
  function animateCounter(el) {
    const target = parseInt(el.getAttribute("data-target"), 10);
    const duration = 1500;
    const start = performance.now();

    function tick(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          animateCounter(e.target);
          observer.unobserve(e.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  document.querySelectorAll(".stat-value[data-target]").forEach((el) =>
    observer.observe(el)
  );

  // ── TERMINAL TYPEWRITER ──────────────────
  function typewriterEffect(el, text, speed = 40) {
    el.textContent = "";
    let i = 0;
    function next() {
      if (i < text.length) {
        el.textContent += text[i++];
        setTimeout(next, speed + Math.random() * 20);
      }
    }
    next();
  }

  document.querySelectorAll("[data-typewriter]").forEach((el) => {
    const text = el.getAttribute("data-typewriter");
    const delay = parseInt(el.getAttribute("data-delay") || "0", 10);
    setTimeout(() => typewriterEffect(el, text), delay);
  });

  // ── PROGRESS BARS ────────────────────────
  const pbObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const fill = e.target.querySelector(".progress-fill");
          if (fill) fill.style.width = fill.getAttribute("data-width");
          pbObserver.unobserve(e.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  document.querySelectorAll(".progress-bar").forEach((el) => {
    const fill = el.querySelector(".progress-fill");
    if (fill) {
      const width = fill.style.width;
      fill.setAttribute("data-width", width);
      fill.style.width = "0";
    }
    pbObserver.observe(el);
  });

  // ── ACTIVE NAV LINK ──────────────────────
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-link").forEach((link) => {
    const href = link.getAttribute("href");
    if (href && href.includes(currentPage)) {
      link.classList.add("active");
    }
  });

  // ── MOBILE SIDEBAR TOGGLE ────────────────
  const toggleBtn = document.getElementById("sidebar-toggle");
  const sidebar   = document.querySelector(".sidebar");
  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener("click", () => sidebar.classList.toggle("open"));
  }

  // ── FADE-IN ANIMATIONS ───────────────────
  const fadeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((e, idx) => {
        if (e.isIntersecting) {
          e.target.style.animationDelay = `${idx * 0.08}s`;
          e.target.classList.add("animate-in");
          fadeObserver.unobserve(e.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll(".post-card, .member-card, .project-item, .stat-card").forEach((el) => {
    fadeObserver.observe(el);
  });
})();
