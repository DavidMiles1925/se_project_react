import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import {
  ValidationContext,
  checkInputValidity,
} from "../../contexts/ValidationContext";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "../ModalWithForm/ModalWithForm.css";

function EditProfileModal({ isLoading }) {
  const { currentUser } = useContext(CurrentUserContext);
  const { setDisableButton, handleUpdateSubmit } =
    useContext(ValidationContext);

  const [nameState, setNameState] = useState({
    valid: true,
    value: currentUser.name,
  });
  const [avatarState, setAvatarState] = useState({
    valid: true,
    value: currentUser.avatar,
  });

  function handleNameChange(e) {
    setNameState({ valid: checkInputValidity(e), value: e.target.value });
  }

  function handleAvatarChange(e) {
    setAvatarState({ valid: checkInputValidity(e), value: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleUpdateSubmit(nameState.value, avatarState.value);
  }

  useEffect(() => {
    setDisableButton(!(nameState.valid && avatarState.valid));
  }, [nameState, avatarState, setDisableButton]);

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
        required
        value={avatarState.value}
        onChange={handleAvatarChange}
      />
      <span className='modal__error avatar__error' id='avatar-error'></span>
    </ModalWithForm>
  );
}

export default EditProfileModal;
