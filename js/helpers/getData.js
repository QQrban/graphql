import { renderErrorModal } from "../utils/renderErrorModal.js";

async function getData(query, token) {
  try {
    const response = await fetch(
      "https://01.kood.tech/api/graphql-engine/v1/graphql",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(query),
      }
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    renderErrorModal(error);
    console.error(error);
  }
}

export { getData };
