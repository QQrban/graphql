async function login() {
  const passwordArea = document.querySelector(".password-container");
  const showPassword = document.getElementById("showPassword");
  const hidePassword = document.getElementById("hidePassword");

  passwordArea.addEventListener("click", (e) => {
    console.log(123);
    if (e.target.classList.contains("show-pass")) {
      console.log(123);
    }
  });
}
