import { updateAppState } from "../updateAppState.js";

function renderHomePage() {
  const mainContent = document.getElementById("content");
  mainContent.innerHTML = "";
  mainContent.insertAdjacentHTML(
    "beforeend",
    `
  <form id="form" class="form-container nes-container with-title">
      <h3 class="title">Please Sign In</h3>
      <div class="nes-field">
        <label for="nameField">Username or Email</label>
        <input type="text" id="nameField" class="nes-input" />
      </div>
      <div class="nes-field">
        <label for="passwordField">Password</label>
        <div class="password-container">
          <input type="password" id="passwordField" class="nes-input" />
          <div class="password-visibility hidden nes-pointer" id="showPassword">
            <svg
              class="show-pass"
              width="34px"
              height="34px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M8 6h8v2H8V6zm-4 4V8h4v2H4zm-2 2v-2h2v2H2zm0 2v-2H0v2h2zm2 2H2v-2h2v2zm4 2H4v-2h4v2zm8 0v2H8v-2h8zm4-2v2h-4v-2h4zm2-2v2h-2v-2h2zm0-2h2v2h-2v-2zm-2-2h2v2h-2v-2zm0 0V8h-4v2h4zm-10 1h4v4h-4v-4z"
                  fill="#000000"
                ></path>
              </g>
            </svg>
          </div>
          <div class="password-visibility nes-pointer" id="hidePassword">
            <svg
              class="hide-pass"
              width="34px"
              height="34px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M0 7h2v2H0V7zm4 4H2V9h2v2zm4 2v-2H4v2H2v2h2v-2h4zm8 0H8v2H6v2h2v-2h8v2h2v-2h-2v-2zm4-2h-4v2h4v2h2v-2h-2v-2zm2-2v2h-2V9h2zm0 0V7h2v2h-2z"
                  fill="#000000"
                ></path>
              </g>
            </svg>
          </div>
        </div>
      </div>
      <span id="errorMsg"></span>
      <button type="submit" class="nes-btn is-success">Log In</button>
    </form>
    `
  );
  const passwordContainer = document.querySelector(".password-container");
  const passwordInput = document.getElementById("passwordField");
  const showPassword = document.getElementById("showPassword");
  const hidePassword = document.getElementById("hidePassword");
  const usernameInput = document.getElementById("nameField");

  passwordContainer.addEventListener("click", (e) => {
    if (e.target.closest("#hidePassword")) {
      hidePassword.classList.add("hidden");
      passwordInput.type = "text";
      showPassword.classList.remove("hidden");
    } else if (e.target.closest("#showPassword")) {
      hidePassword.classList.remove("hidden");
      passwordInput.type = "password";
      showPassword.classList.add("hidden");
    }
  });

  const form = document.getElementById("form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const errorMsg = document.getElementById("errorMsg");
    if (usernameInput.value === "" || passwordInput.value === "") {
      errorMsg.innerHTML = "Please fill in all fields";
      return;
    }

    try {
      const response = await fetch("https://01.kood.tech/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "text/plain",
          "Content-Encoding": "base64",
          Authorization:
            "Basic " + btoa(`${usernameInput.value}:${passwordInput.value}`),
        },
      });
      if (response.ok) {
        const data = await response.json();
        sessionStorage.setItem("JWT", data);
        updateAppState();
      } else {
        errorMsg.innerHTML = "Wrong credentials";
      }
    } catch (error) {
      console.error(error);
    }
  });
}

export { renderHomePage };
