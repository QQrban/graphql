import { getData } from "../helpers/getData.js";
import { updateAppState } from "../updateAppState.js";
import {
  piscineGoQuery,
  piscineJSQuery,
  div01Query,
} from "../helpers/queries.js";

async function renderArticlesPage(token) {
  const mainContent = document.getElementById("content");
  document.body.insertAdjacentHTML(
    "beforeend",
    `<button id="logoutBtn" type="button" class="nes-btn is-error">Log Out</button>
    <div class="select-container">
        <label for="default_select">Select Intra</label>
        <div class="nes-select">
        <select required id="default_select">
            <option  value="0">Piscine Go</option>
            <option selected value="1">Div 01</option>
            <option value="2">Piscine JS</option>
        </select>
        </div>
    </div>
    `
  );

  const selectIntra = {
    0: piscineGoQuery,
    1: div01Query,
    2: piscineJSQuery,
  };

  const select = document.getElementById("default_select");
  let data;

  select.addEventListener("change", async (e) => {
    const queryFunc = selectIntra[e.target.value];
    data = await getData({ query: queryFunc }, token);
    console.log(data);
  });

  mainContent.innerHTML = "";
  mainContent.insertAdjacentHTML(
    "beforeend",
    `
      xxxHELLO MY FRIENDxxx
    `
  );

  const logoutBtn = document.getElementById("logoutBtn");
  logoutBtn.addEventListener("click", () => {
    sessionStorage.removeItem("JWT");
    updateAppState();
    logoutBtn.remove();
  });
}

export { renderArticlesPage };
