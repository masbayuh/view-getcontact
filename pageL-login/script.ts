/**
 * Veridial Mobile — visual interaction layer.
 *
 * Purely presentational: toggles CSS classes to preview UI states
 * and adds a Material-style touch ripple. No validation, no data
 * handling, no network calls.
 */

document.addEventListener("DOMContentLoaded", () => {
  setupPasswordToggle();
  setupStatePreview();
  setupSubmitDemo();
  setupRipple();
});

/** Show/hide password characters. Pure visual affordance. */
function setupPasswordToggle(): void {
  const toggleBtn = document.getElementById(
    "togglePassword",
  ) as HTMLButtonElement | null;
  const passwordInput = document.getElementById(
    "password",
  ) as HTMLInputElement | null;
  if (!toggleBtn || !passwordInput) return;

  const eyeIcon = toggleBtn.querySelector(".icon-eye") as HTMLElement | null;
  const eyeOffIcon = toggleBtn.querySelector(
    ".icon-eye-off",
  ) as HTMLElement | null;

  toggleBtn.addEventListener("click", () => {
    const isHidden = passwordInput.type === "password";
    passwordInput.type = isHidden ? "text" : "password";
    toggleBtn.setAttribute("aria-pressed", String(isHidden));
    toggleBtn.setAttribute(
      "aria-label",
      isHidden ? "Hide password" : "Show password",
    );
    eyeIcon?.toggleAttribute("hidden", isHidden);
    eyeOffIcon?.toggleAttribute("hidden", !isHidden);
  });
}

/**
 * Lets a viewer flip between the five requested visual states
 * (default / focused / error / disabled / loading) with no real logic.
 */
function setupStatePreview(): void {
  const chips = Array.from(
    document.querySelectorAll<HTMLButtonElement>(".state-chip"),
  );
  const screen = document.getElementById("screen");
  const identifierField = document.getElementById("field-identifier");
  const passwordField = document.getElementById("field-password");
  const signInBtn = document.getElementById(
    "signInBtn",
  ) as HTMLButtonElement | null;

  if (
    !chips.length ||
    !screen ||
    !identifierField ||
    !passwordField ||
    !signInBtn
  )
    return;

  function clearAllStates(): void {
    identifierField!.classList.remove("has-error", "is-focused");
    passwordField!.classList.remove("has-error", "is-focused");
    signInBtn!.classList.remove("is-loading", "is-disabled");
    signInBtn!.disabled = false;
    screen!.classList.remove("demo-disabled");
  }

  function applyState(state: string): void {
    clearAllStates();
    switch (state) {
      case "focused":
        identifierField!.classList.add("is-focused");
        break;
      case "error":
        identifierField!.classList.add("has-error");
        passwordField!.classList.add("has-error");
        break;
      case "loading":
        signInBtn!.classList.add("is-loading");
        break;
      case "disabled":
        screen!.classList.add("demo-disabled");
        signInBtn!.disabled = true;
        break;
      default:
        // "default" — nothing extra to apply
        break;
    }
  }

  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      chips.forEach((c) => c.classList.remove("is-active"));
      chip.classList.add("is-active");
      applyState(chip.dataset.state ?? "default");
    });
  });
}

/**
 * Cosmetic-only "loading" flourish when Sign In is pressed directly.
 * Reverts automatically; nothing is submitted or validated.
 */
function setupSubmitDemo(): void {
  const form = document.querySelector<HTMLFormElement>(".auth-form");
  const signInBtn = document.getElementById(
    "signInBtn",
  ) as HTMLButtonElement | null;
  if (!form || !signInBtn) return;

  form.addEventListener("submit", (event: SubmitEvent) => {
    event.preventDefault();
    if (signInBtn.classList.contains("is-loading")) return;

    signInBtn.classList.add("is-loading");
    window.setTimeout(() => {
      signInBtn.classList.remove("is-loading");
    }, 1400);
  });
}

/** Material-style touch ripple on primary buttons. Purely decorative. */
function setupRipple(): void {
  const buttons = document.querySelectorAll<HTMLButtonElement>(".btn");

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
