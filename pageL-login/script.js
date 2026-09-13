"use strict";
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
function setupPasswordToggle() {
  const toggleBtn = document.getElementById("togglePassword");
  const passwordInput = document.getElementById("password");
  if (!toggleBtn || !passwordInput) return;
  const eyeIcon = toggleBtn.querySelector(".icon-eye");
  const eyeOffIcon = toggleBtn.querySelector(".icon-eye-off");
  toggleBtn.addEventListener("click", () => {
    const isHidden = passwordInput.type === "password";
    passwordInput.type = isHidden ? "text" : "password";
    toggleBtn.setAttribute("aria-pressed", String(isHidden));
    toggleBtn.setAttribute(
      "aria-label",
      isHidden ? "Hide password" : "Show password",
    );
    eyeIcon === null || eyeIcon === void 0
      ? void 0
      : eyeIcon.toggleAttribute("hidden", isHidden);
    eyeOffIcon === null || eyeOffIcon === void 0
      ? void 0
      : eyeOffIcon.toggleAttribute("hidden", !isHidden);
  });
}
/**
 * Lets a viewer flip between the five requested visual states
 * (default / focused / error / disabled / loading) with no real logic.
 */
function setupStatePreview() {
  const chips = Array.from(document.querySelectorAll(".state-chip"));
  const screen = document.getElementById("screen");
  const identifierField = document.getElementById("field-identifier");
  const passwordField = document.getElementById("field-password");
  const signInBtn = document.getElementById("signInBtn");
  if (
    !chips.length ||
    !screen ||
    !identifierField ||
    !passwordField ||
    !signInBtn
  )
    return;
  function clearAllStates() {
    identifierField.classList.remove("has-error", "is-focused");
    passwordField.classList.remove("has-error", "is-focused");
    signInBtn.classList.remove("is-loading", "is-disabled");
    signInBtn.disabled = false;
    screen.classList.remove("demo-disabled");
  }
  function applyState(state) {
    clearAllStates();
    switch (state) {
      case "focused":
        identifierField.classList.add("is-focused");
        break;
      case "error":
        identifierField.classList.add("has-error");
        passwordField.classList.add("has-error");
        break;
      case "loading":
        signInBtn.classList.add("is-loading");
        break;
      case "disabled":
        screen.classList.add("demo-disabled");
        signInBtn.disabled = true;
        break;
      default:
        // "default" — nothing extra to apply
        break;
    }
  }
  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      var _a;
      chips.forEach((c) => c.classList.remove("is-active"));
      chip.classList.add("is-active");
      applyState(
        (_a = chip.dataset.state) !== null && _a !== void 0 ? _a : "default",
      );
    });
  });
}
/**
 * Cosmetic-only "loading" flourish when Sign In is pressed directly.
 * Reverts automatically; nothing is submitted or validated.
 */
function setupSubmitDemo() {
  const form = document.querySelector(".auth-form");
  const signInBtn = document.getElementById("signInBtn");
  if (!form || !signInBtn) return;
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (signInBtn.classList.contains("is-loading")) return;
    signInBtn.classList.add("is-loading");
    window.setTimeout(() => {
      signInBtn.classList.remove("is-loading");
    }, 1400);
  });
}
/** Material-style touch ripple on primary buttons. Purely decorative. */
function setupRipple() {
  const buttons = document.querySelectorAll(".btn");
  buttons.forEach((button) => {
    button.addEventListener("pointerdown", (event) => {
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
