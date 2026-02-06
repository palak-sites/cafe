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
  const isInApp =
    /Instagram|FBAN|FBAV/i.test(ua) ||
    (ua.includes("wv") && ua.includes("Version/4.0"));

  const mapFrame = document.getElementById("mapFrame");
  const mapToolbar = document.getElementById("mapToolbar");

  if (!mapFrame || !mapToolbar) return;

  const showButton = () => {
    mapToolbar.style.display = "block";
    mapFrame.style.display = "none";
    mapFrame.removeAttribute("src"); // prevent blank iframe box
  };

  const showMap = () => {
    mapToolbar.style.display = "none";
    mapFrame.style.display = "block";
    const src = mapFrame.getAttribute("data-src") || mapFrame.getAttribute("src");
    if (src) mapFrame.setAttribute("src", src);
  };

  // ✅ If in-app => always button
  if (isInApp) {
    showButton();
    return;
  }

  // ✅ Normal browser => map
  let loaded = false;
  mapFrame.addEventListener("load", () => (loaded = true));

  showMap();

  // ✅ fallback: if iframe didn't load (blocked) => show button
  setTimeout(() => {
    if (!loaded) showButton();
  }, 1500);
});
