function ExpComponent(totalExp, transactions, value = null) {
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
          <div class="nes-table-responsive transactions-table">
            <table class="nes-table is-bordered is-centered">
              <thead>
                <tr>
                  <th>Amount</th>
                  <th>Time</th>
                  <th>Project</th>
                </tr>
              </thead>
              <tbody>
              ${
                transactions
                  ? transactions
                      .sort(
                        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                      )
                      .map((transaction) => {
                        const date = new Date(transaction.createdAt);
                        const formattedDate = date.toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        });
                        const formattedTime = date.toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                        });

                        let formatString;
                        if (value == 0 || value == 2) {
                          formatString = transaction.path
                            .replace(/deprecated-\d{2}-\d{2}-\d{4}-/, "")
                            .split("/")
                            .slice(-1)[0];
                        }
                        return `
                        ${
                          Number(
                            Math.abs(transaction.amount / 1000).toFixed(2)
                          ) > 1
                            ? `              
                          <tr>
                            <td>${Number(
                              Math.abs(transaction.amount / 1000).toFixed(2)
                            )} kB
                            </td>
                            <td>${formattedDate} ${formattedTime}</td>
                            <td>${
                              value == 0 || value == 2
                                ? formatString.length > 12
                                  ? formatString.slice(0, 12) + "..."
                                  : formatString
                                : transaction.path.split("/").slice(-1)[0]
                            }
                            </td>
                          </tr>`
                            : ""
                        }
            `;
                      })
                      .join("")
                  : "No Data"
              }
              </tbody>
            </table>
          </div>
        </section>
    `;
}

export default ExpComponent;
