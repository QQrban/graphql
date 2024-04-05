import { getData } from "../helpers/getData.js";
import { updateAppState } from "../updateAppState.js";
import {
  piscineGoQuery,
  piscineJSQuery,
  div01Query,
  initialQuery,
  generalQuery,
} from "../helpers/queries.js";
import ExpComponent from "../components/ExpComponent.js";

async function renderArticlesPage(token) {
  const initialData = await getData({ query: initialQuery }, token);
  console.log(initialData);
  const mainContent = document.getElementById("content");

  document.body.classList.remove("home");
  const { firstName, lastName, login: userName } = initialData.data.user[0];
  mainContent.classList.add("articles");
  document.body.insertAdjacentHTML(
    "afterbegin",
    `
    <header class="header">
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
      <h1>Welcome, ${firstName} ${lastName}!</h1>
      <div class="header-logout-git">
          <div class="git nes-pointer">
            <a target="_blank" href="https://01.kood.tech/git/${userName}"><img src="icons/git.png"/></a>
          </div>
          <button id="logoutBtn" type="button" class="nes-btn is-error">Log Out</button>
      </div>

    </header>
    `
  );

  const selectIntra = {
    0: piscineGoQuery,
    1: div01Query,
    2: piscineJSQuery,
  };

  const select = document.getElementById("default_select");
  let expData = await getData({ query: generalQuery(div01Query) }, token);
  console.log(expData);

  mainContent.innerHTML = "";
  const { auditGiven, auditReceived } = initialData.data;
  const { auditRatio } = initialData.data.user[0];
  const { amount: totalExp } = expData.data.transaction_aggregate.aggregate.sum;

  //Audit -- static
  mainContent.insertAdjacentHTML(
    "beforeend",
    `
      <section class="nes-container with-title">
      <h3 class="title">Audits</h3>
      <div>
        Audit ratio: <span class="audits-ratio">${Math.abs(auditRatio).toFixed(
          1
        )}
        </span>
      </div>
      <div>
        Audit XP earned: <span class="audits-earned"> ${Math.abs(
          auditGiven.aggregate.sum.amount / 1000000
        ).toFixed(2)} MB</span>
      </div>
      <div >
        Audit XP received: <span class="audits-received"> ${Math.abs(
          auditReceived.aggregate.sum.amount / 1000000
        ).toFixed(2)} MB</span>
      </div>
      </section>
      <div id="expTransactions">
        ${ExpComponent(totalExp)}
      </div>
    `
  );

  const expTransactions = document.getElementById("expTransactions");

  //Exp
  select.addEventListener("change", async (e) => {
    const queryFunc = generalQuery(selectIntra[e.target.value]);
    expData = await getData({ query: queryFunc }, token);
    const { amount: totalExp } =
      expData.data.transaction_aggregate.aggregate.sum;
    expTransactions.innerHTML = ExpComponent(totalExp);
  });

  const logoutBtn = document.getElementById("logoutBtn");
  const header = document.querySelector("header");

  logoutBtn.addEventListener("click", () => {
    sessionStorage.removeItem("JWT");
    updateAppState();
    header.remove();
    mainContent.classList.remove("articles");
    document.body.classList.add("home");
  });
}

export { renderArticlesPage };
