(function (global) {
  let dialog;
  let messageElement;
  let closeButton;

  function createDialog() {
    const style = document.createElement("style");
    style.textContent = [
      "#mkay-error-popup { width: min(420px, calc(100vw - 32px)); padding: 24px; border: 1px solid var(--border, #34394a); border-radius: 16px; background: var(--surface-bg, #171923); color: var(--text, #f5f5f7); box-shadow: 0 24px 80px rgba(0, 0, 0, .55); }",
      "#mkay-error-popup::backdrop { background: rgba(0, 0, 0, .72); backdrop-filter: blur(4px); }",
      "#mkay-error-popup h2 { margin: 0 0 10px; font-size: 20px; }",
      "#mkay-error-popup p { margin: 0; color: var(--muted, #9da2b4); font-size: 14px; line-height: 1.6; }",
      "#mkay-error-popup button { display: block; min-height: 42px; margin: 20px 0 0 auto; padding: 0 18px; border: 0; border-radius: 10px; background: var(--accent, #c1ff5b); color: var(--accent-text, #15190f); font: inherit; font-weight: 800; cursor: pointer; }",
      "#mkay-error-popup button:focus-visible { outline: 3px solid var(--text, #f5f5f7); outline-offset: 3px; }"
    ].join("\n");
    document.head.appendChild(style);

    dialog = document.createElement("dialog");
    dialog.id = "mkay-error-popup";
    dialog.setAttribute("role", "alertdialog");
    dialog.setAttribute("aria-labelledby", "mkay-error-title");
    dialog.setAttribute("aria-describedby", "mkay-error-message");
    dialog.innerHTML = [
      "<h2 id=\"mkay-error-title\">Something went wrong</h2>",
      "<p id=\"mkay-error-message\"></p>",
      "<button type=\"button\">Close</button>"
    ].join("");
    messageElement = dialog.querySelector("#mkay-error-message");
    closeButton = dialog.querySelector("button");
    closeButton.addEventListener("click", function () {
      dialog.close();
    });
    document.body.appendChild(dialog);
  }

  function show(message) {
    if (!dialog) createDialog();
    messageElement.textContent = String(message);

    if (typeof dialog.showModal !== "function") {
      global.alert(String(message));
      return;
    }

    if (!dialog.open) dialog.showModal();
    closeButton.focus();
  }

  global.MkayErrorPopup = { show: show };
})(window);
