import { renderHomePage } from "./pages/renderHomePage.js";
import { renderArticlesPage } from "./pages/renderArticlesPage.js";

async function updateAppState() {
  const token = sessionStorage.getItem("JWT");
  if (!token) {
    renderHomePage();
  } else {
    renderArticlesPage(token);
  }
}

export { updateAppState };
