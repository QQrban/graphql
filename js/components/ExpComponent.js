function ExpComponent(totalExp) {
  return `
        <section class="nes-container with-title">
        <h3 class="title">EXP & Transactions</h3>
        <div class="total-exp">
        Total XP:
            ${
              Math.round(totalExp / 1000) > 1000
                ? Math.abs(totalExp / 1000000).toFixed(2) + " MB"
                : Math.abs(totalExp / 1000).toFixed(0) + " KB"
            } 
        </div>
        <div>

        </div>
        <div >

        </div>
        </section>
    `;
}

export default ExpComponent;
