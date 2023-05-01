import { createContext } from "react";
import { configValidate } from "../utils/constants";

const ValidationContext = createContext();

function checkInputValidity(e) {
  if (e.target.checkValidity()) {
    hideInputError(e.target);
    return true;
  } else {
    showInputError(e.target, e.target.validationMessage);
    return false;
  }
}

function showInputError(inputElement, errorMessage) {
  const errorElement = document.querySelector(`.${inputElement.id}__error`);
  inputElement.classList.add(configValidate.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(configValidate.errorClass);
}

function hideInputError(inputElement) {
  const errorElement = document.querySelector(`.${inputElement.id}__error`);
  inputElement.classList.remove(configValidate.inputErrorClass);
  errorElement.classList.remove(configValidate.errorClass);
  errorElement.textContent = "";
}

function errorMessageHandler(err) {
  if (err === "Error: 400") {
    return "Validation Error";
  } else if (err === "Error: 401") {
    return "Invalid username or password.";
  } else if (err === "Error: 403") {
    return "Forbidden";
  } else if (err === "Error: 404") {
    return "Not Found";
  } else if (err === "Error: 409") {
    return "This user already exists, please use a unique email address.";
  } else {
    return "Something went wrong.";
  }
}

export {
  ValidationContext,
  showInputError,
  hideInputError,
  checkInputValidity,
  errorMessageHandler,
};
