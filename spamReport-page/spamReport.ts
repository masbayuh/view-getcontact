/**
 * Veridial Mobile — Spam Reports visual interaction layer.
 *
 * Purely presentational: touch ripple feedback on list items.
 * The protection switch and all figures are static display values.
 */

document.addEventListener("DOMContentLoaded", () => {
  setupRipple();
});

/** Material-style touch ripple on tappable elements. Purely decorative. */
function setupRipple(): void {
  const targets = document.querySelectorAll<HTMLElement>(".icon-btn, .report-item");

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
