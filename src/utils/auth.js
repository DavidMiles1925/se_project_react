const baseUrl = "http://localhost:3001";

const processServerResponse = (res) => {
  if (res.ok) {
    return res.json();
  }

  console.log(`Error: ${res.status}`);
  return Promise.reject(`Error: ${res.status}`);
};

function request(url, options) {
  return fetch(url, options).then(processServerResponse);
}

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

export { signup, signin, checkToken };
