const initialQuery = `{
      user {
          firstName
          lastName
      }
      auditGiven: transaction(where: {type: {_eq: "up"}}) {
        amount
      }
      auditReceived: transaction(where: {type: {_eq: "down"}}) {
        amount
      }        
  }`;

const div01Query = `
      type: {_eq: "xp"},
      _and: [
        {path: {_like: "/johvi/div-01/%"}},
        {path: {_nlike: "/johvi/div-01/piscine-js%"}}
      ]
  `;

const piscineGoQuery = `
      type : {_eq:"xp"},
      path: {_like:"/johvi/piscine-go/%"}
  `;

const piscineJSQuery = `
      type : {_eq:"xp"},
      path: {_like:"/johvi/div-01/piscine-js%"}
  `;

const generalQuery = (query) => {
  return `{
    transaction(
            where: {
              ${query}
            }
          ) {
            amount
            path
    }  
    transaction_aggregate(
              where: {
                ${query}
              }
            ) {
          aggregate {
            sum {
              amount
            }
          }
  }
    }`;
};

export {
  initialQuery,
  div01Query,
  piscineGoQuery,
  piscineJSQuery,
  generalQuery,
};
