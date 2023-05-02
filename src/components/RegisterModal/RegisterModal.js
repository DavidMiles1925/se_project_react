import { useState, useEffect, useContext } from "react";
import {
  ValidationContext,
  checkInputValidity,
} from "../../contexts/ValidationContext";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "../ModalWithForm/ModalWithForm.css";

function RegisterModal({ isLoading }) {
  const { setDisableButton, handleSignupSubmit } =
    useContext(ValidationContext);

  const [emailState, setEmailState] = useState({ valid: false, value: "" });
  const [passwordState, setPasswordState] = useState({
    valid: false,
    value: "",
  });
  const [nameState, setNameState] = useState({ valid: false, value: "" });
  const [avatarState, setAvatarState] = useState({ valid: false, value: "" });

  useEffect(() => {
    setDisableButton(!(emailState.valid && passwordState.valid));
  }, [emailState, passwordState, setDisableButton]);

  useEffect(() => {
    setEmailState({ valid: false, value: "" });
    setPasswordState({ valid: false, value: "" });
    setNameState({ valid: false, value: "" });
    setAvatarState({ valid: false, value: "" });
  }, []);

  function handleEmailChange(e) {
    setEmailState({ valid: checkInputValidity(e), value: e.target.value });
  }

  function handlePasswordChange(e) {
    setPasswordState({ valid: checkInputValidity(e), value: e.target.value });
  }

  function handleNameChange(e) {
    setNameState({ valid: checkInputValidity(e), value: e.target.value });
  }

  function handleAvatarChange(e) {
    setAvatarState({ valid: checkInputValidity(e), value: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleSignupSubmit(
      emailState.value,
      passwordState.value,
      nameState.value,
      avatarState.value
    );
  }

  return (
    <ModalWithForm
      title='Sign Up'
      name='signup'
      buttonText={isLoading ? "Saving..." : "Signup"}
      handleSubmit={handleSubmit}
      alternateButton={{ value: true, text: " or Log In", path: "signin" }}
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

      <label className='modal__label'>Name</label>
      <input
        className='modal__input modal__input_type_text'
        type='text'
        name='name'
        id='name'
        placeholder='Name'
        maxLength='30'
        value={nameState.value}
        onChange={handleNameChange}
      />
      <span className='modal__error name__error' id='name-error'></span>

      <label className='modal__label'>Avatar URL</label>
      <input
        className='modal__input modal__input_type_text'
        type='url'
        name='avatar'
        id='avatar'
        placeholder='Avatar URL'
        value={avatarState.value}
        onChange={handleAvatarChange}
      />
      <span className='modal__error avatar__error' id='avatar-error'></span>
    </ModalWithForm>
  );
}

export default RegisterModal;
