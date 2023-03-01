const baseUrl =
  "https://my-json-server.typicode.com/DavidMiles1925/se_project_react";

const processServerResponse = (res) => {
  if (res.ok) {
    return res.json();
  }

  console.log(`Error: ${res.status}`);
  return Promise.reject(`Error: ${res.status}`);
};

function getCards() {
  return fetch(`${baseUrl}/items`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  }).then(processServerResponse);
}

function addCard(data) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: data.id,
      name: data.name,
      link: data.link,
      weather: data.weather,
    }),
  }).then(processServerResponse);
}

function deleteCard(id) {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  }).then(processServerResponse);
}

export { getCards, addCard, deleteCard };
