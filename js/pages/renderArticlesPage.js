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
import GraphComponent from "../components/GraphComponent.js";
import { dataProcessing } from "../helpers/dataProcessing.js";
import { buildGraph } from "../helpers/buildGraph.js";

async function renderArticlesPage(token) {
  const initialData = await getData({ query: initialQuery }, token);
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

  mainContent.innerHTML = "";
  const { auditGiven, auditReceived } = initialData.data;
  const { auditRatio } = initialData.data.user[0];
  const { amount: totalExp } = expData.data.transaction_aggregate.aggregate.sum;
  const { transaction: transactions } = expData.data;

  //Audit -- static
  mainContent.insertAdjacentHTML(
    "beforeend",
    `
    <div class="left-column">
           <section class="nes-container with-title audits-container">
        <h3 class="title">Audits</h3>
        <div>
          Audit ratio: <span class="light-blue-color">${Math.abs(
            auditRatio
          ).toFixed(1)}
          </span>
        </div>
        <div>
          Audit XP earned: <span class="success-color"> ${Math.abs(
            auditGiven.aggregate.sum.amount / 1000000
          ).toFixed(2)} MB</span>
        </div>
        <div>
          Audit XP received: <span class="error-color"> ${Math.abs(
            auditReceived.aggregate.sum.amount / 1000000
          ).toFixed(2)} MB</span>
        </div>
      </section>
      <div id="expTransactions">
        ${ExpComponent(totalExp, transactions)}
      </div>
    </div>
    <div id="graph">
      ${GraphComponent()}
    </div>
    `
  );

  //Exp -- dynamic
  const expTransactions = document.getElementById("expTransactions");

  const logoutBtn = document.getElementById("logoutBtn");
  const header = document.querySelector("header");

  logoutBtn.addEventListener("click", () => {
    sessionStorage.removeItem("JWT");
    updateAppState();
    header.remove();
    mainContent.classList.remove("articles");
    document.body.classList.add("home");
  });

  let graphData = expData.data.transaction;
  let processedData = dataProcessing(graphData);

  buildGraph(processedData);

  select.addEventListener("change", async (e) => {
    const queryFunc = generalQuery(selectIntra[e.target.value]);
    expData = await getData({ query: queryFunc }, token);
    graphData = expData.data.transaction;
    processedData = dataProcessing(graphData);
    const { amount: totalExp } =
      expData.data.transaction_aggregate.aggregate.sum;
    const { transaction: transactions } = expData.data;
    expTransactions.innerHTML = ExpComponent(
      totalExp,
      transactions,
      e.target.value
    );
    let svgContainer = document.querySelector(".svg_container");
    if (svgContainer) {
      svgContainer.remove();
    }
    buildGraph(processedData);
  });
}

export { renderArticlesPage };
