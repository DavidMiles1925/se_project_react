import { createContext } from "react";

const ValidationContext = createContext();

function errorMessageHandler(err) {
  if (err === "Error: 400") {
    return "Bad Request";
  } else if (err === "Error: 401") {
    return "Invalid username or password.";
  } else if (err === "Error: 403") {
    return "Forbidden";
  } else if (err === "Error: 404") {
    return "Not Found";
  } else if (err === "Error: 409") {
    return "This user already exists, please use a unique email address.";
  } else if (err.name === "TypeError") {
    return "Could not connect to server.";
  } else {
    return "Something went wrong.";
  }
}

export { ValidationContext, errorMessageHandler };
