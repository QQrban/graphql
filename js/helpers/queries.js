const staticQuery = `
        user {
            firstName
            lastName
        }
    `;

const div01Query = `{
    ${staticQuery}
    transaction(
        where: {
          type: {_eq: "xp"},
          _and: [
            {path: {_like: "/johvi/div-01/%"}},
            {path: {_nlike: "/johvi/div-01/piscine-js%"}}
          ]
        }
      ) {
        amount
        path
      }
  }`;

const piscineGoQuery = `{
    ${staticQuery}
    transaction(
        where:{
          type : {_eq:"xp"},
          path: {_like:"/johvi/piscine-go/%"}
        }
      ) {
        amount
        path
      }
  }`;

const piscineJSQuery = `{
    ${staticQuery}
    transaction(
        where:{
          type : {_eq:"xp"},
          path: {_like:"/johvi/div-01/piscine-js%"}
        }
      ) {
        amount
        path
      }
  }`;

export { div01Query, piscineGoQuery, piscineJSQuery };
