import { createContext } from "react";

const ValidationContext = createContext();

function showInputError(inputElement, errorMessage) {
  const errorElement = document.querySelector(`.${inputElement.id}__error`);
  inputElement.classList.add("modal__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("modal__error_visible");
}

function hideInputError(inputElement) {
  const errorElement = document.querySelector(`.${inputElement.id}__error`);
  inputElement.classList.remove("modal__input_type_error");
  errorElement.classList.remove("modal__error_visible");
  errorElement.textContent = "";
}

function hasInvalidInput() {
  const inputList = [...document.querySelectorAll(".modal__input_type_text")];
  return inputList.some((inputElement) => !inputElement.checkValidity());
}

export { ValidationContext, showInputError, hideInputError, hasInvalidInput };
