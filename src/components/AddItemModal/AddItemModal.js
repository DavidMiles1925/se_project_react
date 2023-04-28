import { useState, useEffect, useContext } from "react";
import {
  ValidationContext,
  showInputError,
  hideInputError,
} from "../../contexts/ValidationContext";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function AddItemModal({ isLoading }) {
  const { setDisableButton, handleAddItemSubmit } =
    useContext(ValidationContext);
  const [nameState, setNameState] = useState({
    valid: false,
    value: "",
  });
  const [linkState, setLinkState] = useState({
    valid: false,
    value: "",
  });
  const [weatherState, setWeatherState] = useState("");

  function checkInputValidity(e) {
    if (e.target.checkValidity()) {
      hideInputError(e.target);
      return true;
    } else {
      showInputError(e.target, e.target.validationMessage);
      return false;
    }
  }

  function handleNameChange(e) {
    setNameState({ valid: checkInputValidity(e), value: e.target.value });
  }

  function handleLinkChange(e) {
    setLinkState({
      valid: checkInputValidity(e),
      value: e.target.value,
    });
  }

  function handleWeatherChange(e) {
    setWeatherState(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleAddItemSubmit(nameState.value, linkState.value, weatherState);
  }

  useEffect(() => {
    setDisableButton(!(nameState.valid && linkState.valid && weatherState));
  }, [nameState, linkState, weatherState, setDisableButton]);

  useEffect(() => {
    setNameState({ valid: false, value: "" });
    setLinkState({ valid: false, value: "" });
    setWeatherState();
  }, []);

  return (
    <ModalWithForm
      title='New Garment'
      name='new-card'
      buttonText={isLoading ? "Saving..." : "Save"}
      handleSubmit={handleSubmit}
      buttonModifier={{ value: false, text: "", path: "" }}
    >
      <label className='modal__label'>Name</label>
      <input
        className='modal__input modal__input_type_text'
        type='text'
        name='name'
        id='name'
        placeholder='Title'
        required
        minLength='1'
        maxLength='30'
        value={nameState.value}
        onChange={handleNameChange}
      />
      <span className='modal__error name__error' id='name-error'></span>
      <label className='modal__label'>Link</label>
      <input
        className='modal__input modal__input_type_text'
        type='url'
        name='link'
        id='link'
        placeholder='URL'
        value={linkState.value}
        required
        onChange={handleLinkChange}
      />
      <span className='modal__error link__error' id='link_error'></span>
      <label className='modal__label'>Select the weather type</label>
      <div className='modal__radio-container'>
        <label className='modal__label modal__label_type_radio'>
          <input
            className='modal__input modal__input_type_radio'
            type='radio'
            name='weatherType'
            id='choiceHot'
            value='hot'
            onChange={handleWeatherChange}
          />
          Hot
        </label>
      </div>
      <div className='modal__radio-container'>
        <label className='modal__label modal__label_type_radio'>
          <input
            className='modal__input modal__input_type_radio'
            type='radio'
            name='weatherType'
            id='choiceWarm'
            value='warm'
            onChange={handleWeatherChange}
          />
          Warm
        </label>
      </div>
      <div className='modal__radio-container'>
        <label className='modal__label modal__label_type_radio'>
          <input
            className='modal__input modal__input_type_radio'
            type='radio'
            name='weatherType'
            id='choiceCold'
            value='cold'
            onChange={handleWeatherChange}
          />
          Cold
        </label>
      </div>
    </ModalWithForm>
  );
}

export default AddItemModal;
