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
  if (!btn || !lbImg || !lightbox) return;

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

// ===== Year (optional) =====
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ===== Map: Instagram/Facebook in-app fix + No blank waste =====
document.addEventListener("DOMContentLoaded", () => {
  const ua = navigator.userAgent || "";
  const isInApp = /Instagram|FBAN|FBAV/i.test(ua);

  const mapWrap = document.querySelector(".map");
  const mapToolbar = document.getElementById("mapToolbar");
  const mapFrame = document.getElementById("mapFrame");

  if (!mapWrap || !mapToolbar) return;

  if (isInApp) {
    // ✅ In-app: iframe hide + remove space
    mapWrap.classList.add("is-inapp");
    mapToolbar.style.display = "block";
    if (mapFrame) {
      mapFrame.style.display = "none";
      mapFrame.removeAttribute("src");
    }
  } else {
    // ✅ Normal browsers: load iframe
    mapWrap.classList.remove("is-inapp");
    mapToolbar.style.display = "none";

    if (mapFrame) {
      const src = mapFrame.getAttribute("data-src");
      if (src) mapFrame.setAttribute("src", src);
      mapFrame.style.display = "block";
    }
  }
});
