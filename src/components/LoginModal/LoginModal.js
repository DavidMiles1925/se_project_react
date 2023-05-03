import { useEffect, useContext } from "react";
import { ValidationContext } from "../../contexts/ValidationContext";
import { useFormAndValidation } from "../../utils/useFormAndValidation";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "../ModalWithForm/ModalWithForm.css";

function LoginModal({ isLoading }) {
  const { setDisableButton, handleLoginSubmit } = useContext(ValidationContext);

  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();

  function handleSubmit(e) {
    e.preventDefault();
    handleLoginSubmit(values);
  }

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  useEffect(() => {
    setDisableButton(!isValid);
  }, [values, isValid, setDisableButton]);

  return (
    <ModalWithForm
      title='Log In'
      name='signin'
      buttonText={isLoading ? "Saving..." : "Sign In"}
      handleSubmit={handleSubmit}
      alternateButton={{ value: true, text: " or Register", path: "signup" }}
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
        value={values.email || ""}
        onChange={handleChange}
      />
      <span className='modal__error email__error' id='email-error'>
        {errors.email}
      </span>

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
        value={values.password || ""}
        onChange={handleChange}
      />
      <span className='modal__error password__error' id='password-error'>
        {errors.password}
      </span>
    </ModalWithForm>
  );
}

export default LoginModal;
