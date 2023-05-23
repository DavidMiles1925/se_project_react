import { request } from "./api.js";

const baseUrl =
  process.env.NODE_ENV === "production"
    ? "//api.dmwtwr.crabdance.com"
    : "http://localhost:3001";

function signup(data) {
  const { name, avatar, email, password } = data;

  return request(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar, email, password }),
  });
}

function signin(data) {
  const { email, password } = data;
  return request(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
}

function checkToken(token) {
  return request(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
}

function updateUser(data) {
  const { name, avatar, token } = data;
  return request(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar }),
  });
}

export { signup, signin, checkToken, updateUser };
