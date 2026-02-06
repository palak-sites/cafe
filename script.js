// ====== Menu filter (chips) ======
const chips = document.querySelectorAll(".chip");
const menuCards = document.querySelectorAll(".menu-card");

chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    chips.forEach((c) => c.classList.remove("is-active"));
    chip.classList.add("is-active");

    const filter = chip.dataset.filter;

    menuCards.forEach((card) => {
      const cat = card.dataset.cat;
      const show = filter === "all" || filter === cat;
      card.style.display = show ? "block" : "none";
    });
  });
});

// ===== Lightbox =====
const lightbox = document.getElementById("lightbox");
const lbImg = document.getElementById("lbImg");
const lbClose = document.getElementById("lbClose");

function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  if (lbImg) lbImg.src = "";
}

document.addEventListener("click", (e) => {
  const btn = e.target.closest(".g-item");
  if (!btn || !lightbox || !lbImg) return;

  const src = btn.getAttribute("data-src") || btn.querySelector("img")?.src;
  if (!src) return;

  lbImg.src = src;
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
});

if (lbClose) lbClose.addEventListener("click", closeLightbox);

if (lightbox) {
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
});

// ===== Map: Instagram/Facebook in-app fix (never blank) =====
document.addEventListener("DOMContentLoaded", () => {
  const ua = navigator.userAgent || "";
  const isInApp = /Instagram|FBAN|FBAV/i.test(ua);

  const mapFrame = document.getElementById("mapFrame");
  const mapToolbar = document.getElementById("mapToolbar");

  if (!mapToolbar) return;

  if (isInApp) {
    // In-app: iframe hide + stop loading, button show
    if (mapFrame) {
      mapFrame.style.display = "none";
      mapFrame.src = "about:blank";
    }
    mapToolbar.style.display = "block";
  } else {
    // Normal browser: map show, button hide
    if (mapFrame) mapFrame.style.display = "block";
    mapToolbar.style.display = "none";
  }
});
