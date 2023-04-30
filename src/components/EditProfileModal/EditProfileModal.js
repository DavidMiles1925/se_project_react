import { useContext, useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { ValidationContext } from "../../contexts/ValidationContext";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function EditProfileModal({ isLoading }) {
  const { userData } = useContext(CurrentUserContext);
  const { setDisableButton, handleUpdateSubmit } =
    useContext(ValidationContext);

  const [nameState, setNameState] = useState(userData.name);
  const [avatarState, setAvatarState] = useState(userData.avatar);

  function handleSubmit(e) {
    e.preventDefault();
    handleUpdateSubmit();
  }

  return (
    <ModalWithForm
      title='Edit Profile'
      name='edit'
      buttonText={isLoading ? "Saving..." : "Save"}
      handleSubmit={handleSubmit}
      buttonModifier={{ value: true, text: " or Cancel", path: null }}
    ></ModalWithForm>
  );
}

export default EditProfileModal;
