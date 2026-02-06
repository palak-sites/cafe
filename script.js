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
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  lbImg.src = "";
}

document.addEventListener("click", (e) => {
  const btn = e.target.closest(".g-item");
  if (!btn) return;

  const src = btn.getAttribute("data-src") || btn.querySelector("img")?.src;
  if (!src) return;

  lbImg.src = src;
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
});

lbClose.addEventListener("click", closeLightbox);

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
});
document.addEventListener("DOMContentLoaded", () => {
  const ua = navigator.userAgent || "";

  // ✅ Instagram + Facebook in-app + WebView catch
document.addEventListener("DOMContentLoaded", () => {
  const mapFrame = document.getElementById("mapFrame");
  const mapToolbar = document.getElementById("mapToolbar");

  if (!mapToolbar) return;

  // ✅ Button ALWAYS visible by default (never blank)
  mapToolbar.style.display = "block";

  if (!mapFrame) return;

  // ✅ Try to load map only in normal browsers
  const src = mapFrame.getAttribute("data-src");
  if (src) mapFrame.setAttribute("src", src);

  // ✅ If map loads successfully -> hide button
  mapFrame.addEventListener("load", () => {
    mapToolbar.style.display = "none";
  });

  // ✅ If map doesn't load (Instagram blocks iframe) -> keep button visible
  setTimeout(() => {
    // If iframe still has no content / blocked, button stays
    // (no action needed because button already visible)
  }, 1500);
});

