import { useState, useEffect, useContext } from "react";
import {
  ValidationContext,
  showInputError,
  hideInputError,
} from "../../contexts/ValidationContext";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function LoginModal({ isLoading }) {
  const { setDisableButton, handleLoginSubmit } = useContext(ValidationContext);

  const [emailState, setEmailState] = useState({ valid: false, value: "" });
  const [passwordState, setPasswordState] = useState({
    valid: false,
    value: "",
  });

  useEffect(() => {
    setDisableButton(!(emailState.valid && passwordState.valid));
  }, [emailState, passwordState, setDisableButton]);

  useEffect(() => {
    setEmailState({ valid: false, value: "" });
    setPasswordState({ valid: false, value: "" });
  }, []);

  function checkInputValidity(e) {
    if (e.target.checkValidity()) {
      hideInputError(e.target);
      return true;
    } else {
      showInputError(e.target, e.target.validationMessage);
      return false;
    }
  }

  function handleEmailChange(e) {
    setEmailState({ valid: checkInputValidity(e), value: e.target.value });
  }

  function handlePasswordChange(e) {
    setPasswordState({ valid: checkInputValidity(e), value: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleLoginSubmit(emailState.value, passwordState.value);
  }

  return (
    <ModalWithForm
      title='Sign Up'
      name='signup'
      buttonText={isLoading ? "Saving..." : "Signup"}
      handleSubmit={handleSubmit}
      buttonModifier={{ value: true, text: "or Register", path: "/signup" }}
    >
      <label className='modal__label'>Email*</label>
      <input
        className='modal__input modal__input_type_text'
        type='email'
        name='email'
        id='email'
        placeholder='Email'
        required
        minLength='1'
        maxLength='30'
        value={emailState.value}
        onChange={handleEmailChange}
      />
      <span className='modal__error email__error' id='email-error'></span>

      <label className='modal__label'>Password*</label>
      <input
        className='modal__input modal__input_type_text'
        type='password'
        name='password'
        id='password'
        placeholder='Password'
        required
        minLength='8'
        maxLength='30'
        value={passwordState.value}
        onChange={handlePasswordChange}
      />
      <span className='modal__error password__error' id='password-error'></span>
    </ModalWithForm>
  );
}

export default LoginModal;
