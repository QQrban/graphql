import { ErrorModalComponent } from "../components/ErrorModalComponent.js";

function renderErrorModal(text) {
  document.body.insertAdjacentHTML(`afterbegin`, ErrorModalComponent(text));
  document.getElementById("dialog-default").showModal();
}

export { renderErrorModal };
