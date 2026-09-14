/**
 * Veridial Mobile — Phone Lookup Result visual interaction layer.
 *
 * Purely presentational: touch ripple feedback and a cosmetic
 * "saved" confirmation on the Save Contact button. No contact
 * storage, no reporting logic, no sharing/network calls.
 */

document.addEventListener("DOMContentLoaded", () => {
  setupRipple();
  setupSaveDemo();
});

/** Material-style touch ripple on buttons. Purely decorative. */
function setupRipple(): void {
  const buttons =
    document.querySelectorAll<HTMLButtonElement>(".btn, .icon-btn");

  buttons.forEach((button) => {
    button.addEventListener("pointerdown", (event: PointerEvent) => {
      if (button.disabled) return;

      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const ripple = document.createElement("span");

      ripple.className = "btn__ripple";
      ripple.style.width = `${size}px`;
      ripple.style.height = `${size}px`;
      ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${event.clientY - rect.top - size / 2}px`;

      button.appendChild(ripple);
      ripple.addEventListener("animationend", () => ripple.remove());
    });
  });
}

/**
 * Cosmetic-only feedback: briefly shows a loading spinner then a
 * "saved" tint on the Save Contact button. No contact is actually saved.
 */
function setupSaveDemo(): void {
  const saveBtn = document.querySelector<HTMLButtonElement>(".btn--primary");
  if (!saveBtn) return;

  saveBtn.addEventListener("click", () => {
    if (
      saveBtn.classList.contains("is-loading") ||
      saveBtn.classList.contains("is-saved")
    )
      return;

    saveBtn.classList.add("is-loading");
    window.setTimeout(() => {
      saveBtn.classList.remove("is-loading");
      saveBtn.classList.add("is-saved");
      const label = saveBtn.querySelector(".btn__label");
      if (label) label.textContent = "Saved";
    }, 1100);
  });
}
