"use strict";
/**
 * Veridial Mobile — Home/Dashboard visual interaction layer.
 *
 * Purely presentational: touch ripple feedback and a static
 * bottom-nav tab highlight. No search logic, no data fetching,
 * no state management — everything shown is static.
 */
document.addEventListener("DOMContentLoaded", () => {
  setupRipple();
  setupBottomNav();
  setupSearchDemo();
});
/** Material-style touch ripple on tappable elements. Purely decorative. */
function setupRipple() {
  const targets = document.querySelectorAll(
    ".btn, .bottom-nav__item, .icon-btn",
  );
  targets.forEach((el) => {
    el.addEventListener("pointerdown", (event) => {
      if (el instanceof HTMLButtonElement && el.disabled) return;
      const rect = el.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const ripple = document.createElement("span");
      ripple.className = "btn__ripple";
      ripple.style.width = `${size}px`;
      ripple.style.height = `${size}px`;
      ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${event.clientY - rect.top - size / 2}px`;
      el.appendChild(ripple);
      ripple.addEventListener("animationend", () => ripple.remove());
    });
  });
}
/** Switches the active tab highlight in the bottom nav. Visual only — no routing. */
function setupBottomNav() {
  const items = Array.from(document.querySelectorAll(".bottom-nav__item"));
  if (!items.length) return;
  items.forEach((item) => {
    item.addEventListener("click", () => {
      items.forEach((i) => i.classList.remove("is-active"));
      item.classList.add("is-active");
    });
  });
}
/** Cosmetic-only loading flourish on the search button. Nothing is searched. */
function setupSearchDemo() {
  const searchBtn = document.querySelector(".search-card .btn--primary");
  if (!searchBtn) return;
  searchBtn.addEventListener("click", () => {
    if (searchBtn.classList.contains("is-loading")) return;
    searchBtn.classList.add("is-loading");
    window.setTimeout(() => {
      searchBtn.classList.remove("is-loading");
    }, 1200);
  });
}
