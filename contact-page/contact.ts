/**
 * Veridial Mobile — Contacts visual interaction layer.
 *
 * Purely presentational: touch ripple feedback, focus styling on the
 * search field, and bottom-nav tab highlight. The search field does
 * not filter anything — the list stays static.
 */

document.addEventListener("DOMContentLoaded", () => {
  setupRipple();
  setupBottomNav();
});

/** Material-style touch ripple on tappable elements. Purely decorative. */
function setupRipple(): void {
  const targets = document.querySelectorAll<HTMLElement>(
    ".icon-btn, .bottom-nav__item, .contact-item"
  );

  targets.forEach((el) => {
    el.addEventListener("pointerdown", (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const ripple = document.createElement("span");

      ripple.className = "btn__ripple";
      ripple.style.width = `${size}px`;
      ripple.style.height = `${size}px`;
      ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${event.clientY - rect.top - size / 2}px`;

      if (getComputedStyle(el).position === "static") {
        el.style.position = "relative";
      }
      el.style.overflow = "hidden";

      el.appendChild(ripple);
      ripple.addEventListener("animationend", () => ripple.remove());
    });
  });
}

/** Switches the active tab highlight in the bottom nav. Visual only — no routing. */
function setupBottomNav(): void {
  const items = Array.from(document.querySelectorAll<HTMLButtonElement>(".bottom-nav__item"));
  if (!items.length) return;

  items.forEach((item) => {
    item.addEventListener("click", () => {
      items.forEach((i) => i.classList.remove("is-active"));
      item.classList.add("is-active");
    });
  });
}
