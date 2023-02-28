import { createContext } from "react";
import { configValidate } from "../utils/constants";

const ValidationContext = createContext();

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

export { ValidationContext, showInputError, hideInputError };
