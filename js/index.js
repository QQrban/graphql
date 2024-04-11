import { updateAppState } from "./updateAppState.js";

async function initApp() {
  await updateAppState();
  window.addEventListener("popstate", async (event) => {
    updateAppState();
  });
}
document.addEventListener("DOMContentLoaded", initApp);
