import { useContext, useEffect } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { ValidationContext } from "../../contexts/ValidationContext";
import { useFormAndValidation } from "../../utils/useFormAndValidation";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "../ModalWithForm/ModalWithForm.css";

function EditProfileModal({ isLoading }) {
  const { currentUser } = useContext(CurrentUserContext);
  const { setDisableButton, handleUpdateSubmit } =
    useContext(ValidationContext);

  const { values, handleChange, errors, isValid, setValues } =
    useFormAndValidation();

  function handleSubmit(e) {
    e.preventDefault();
    handleUpdateSubmit(values);
  }

  useEffect(() => {
    setValues(currentUser);
  }, [currentUser, setValues]);

  useEffect(() => {
    setDisableButton(!isValid);
  }, [values, isValid, setDisableButton]);

  return (
    <ModalWithForm
      title='Edit Profile'
      name='edit'
      buttonText={isLoading ? "Saving..." : "Save"}
      handleSubmit={handleSubmit}
      alternateButton={{ value: true, text: " or Cancel", path: null }}
    >
      <label className='modal__label'>Name</label>
      <input
        className='modal__input modal__input_type_text'
        type='text'
        name='name'
        id='name'
        placeholder='Name'
        required
        minLength='1'
        maxLength='30'
        value={values.name || ""}
        onChange={handleChange}
      />
      <span className='modal__error name__error' id='name-error'>
        {errors.name}
      </span>

      <label className='modal__label'>Avatar URL</label>
      <input
        className='modal__input modal__input_type_text'
        type='url'
        name='avatar'
        id='avatar'
        placeholder='Avatar URL'
        required
        value={values.avatar || ""}
        onChange={handleChange}
      />
      <span className='modal__error avatar__error' id='avatar-error'>
        {errors.avatar}
      </span>
    </ModalWithForm>
  );
}

export default EditProfileModal;
