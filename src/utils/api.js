// const baseUrl = "https://my-json-server.typicode.com/DavidMiles1925/se_project_react";
const baseUrl =
  process.env.NODE_ENV === "production"
    ? "//api.dmwtwr.crabdance.com"
    : "http://localhost:3000";

const processServerResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
};

function request(url, options) {
  return fetch(url, options).then(processServerResponse);
}

function getCards() {
  return request(`${baseUrl}/items`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
}

function addCard(data, token) {
  return request(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      id: data.id,
      name: data.name,
      imageUrl: data.link,
      weather: data.weather,
    }),
  });
}

function deleteCard(id, token) {
  return request(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
}

function likeCard(id, token) {
  return request(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "Application/json",
      authorization: `Bearer ${token}`,
    },
  });
}

function unlikeCard(id, token) {
  return request(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "Application/json",
      authorization: `Bearer ${token}`,
    },
  });
}

export { request, getCards, addCard, deleteCard, likeCard, unlikeCard };
