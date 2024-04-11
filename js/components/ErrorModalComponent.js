function ErrorModalComponent(text) {
  return `
        <section>

        <dialog class="nes-dialog" id="dialog-default">
            <form method="dialog">
            <p class="title">Dialog</p>
            <p>${text}</p>
            <menu class="dialog-menu">
                <button id="confirmBtn" class="nes-btn is-primary">Confirm</button>
            </menu>
            </form>
        </dialog>
        </section>
    `;
}

export { ErrorModalComponent };
