"use strict";
/**
 * Veridial Mobile — Search History visual interaction layer.
 *
 * Purely presentational: touch ripple feedback, filter-chip active
 * state, and bottom-nav tab highlight. No actual filtering, sorting,
 * or data fetching — the list content stays static.
 */
document.addEventListener("DOMContentLoaded", () => {
  setupRipple();
  setupFilterChips();
  setupBottomNav();
});
/** Material-style touch ripple on tappable elements. Purely decorative. */
function setupRipple() {
  const targets = document.querySelectorAll(
    ".icon-btn, .filter-chip, .bottom-nav__item, .history-item",
  );
  targets.forEach((el) => {
    el.addEventListener("pointerdown", (event) => {
      const rect = el.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const ripple = document.createElement("span");
      ripple.className = "btn__ripple";
      ripple.style.width = `${size}px`;
      ripple.style.height = `${size}px`;
      ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${event.clientY - rect.top - size / 2}px`;
      const previousPosition = getComputedStyle(el).position;
      if (previousPosition === "static") {
        el.style.position = "relative";
      }
      el.style.overflow = "hidden";
      el.appendChild(ripple);
      ripple.addEventListener("animationend", () => ripple.remove());
    });
  });
}
/** Highlights the tapped filter chip. Visual only — the list is not actually filtered. */
function setupFilterChips() {
  const chips = Array.from(document.querySelectorAll(".filter-chip"));
  if (!chips.length) return;
  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      chips.forEach((c) => c.classList.remove("is-active"));
      chip.classList.add("is-active");
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
