import { useEffect, useContext } from "react";
import {
  ValidationContext,
  showInputError,
  hideInputError,
  hasInvalidInput,
} from "../../contexts/ValidationContext";
import "./AddItemModal.css";

function AddItemModal() {
  const { setDisableButton } = useContext(ValidationContext);

  function checkInputValidity(e) {
    setDisableButton(hasInvalidInput);
    if (e.target.checkValidity()) {
      hideInputError(e.target);
    } else {
      showInputError(e.target, e.target.validationMessage);
    }
  }

  return (
    <>
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
        onChange={checkInputValidity}
      />
      <span className='modal__error name__error' id='name-error'></span>

      <label className='modal__label'>Link</label>
      <input
        className='modal__input modal__input_type_text'
        type='url'
        name='link'
        id='link'
        placeholder='URL'
        required
        onChange={checkInputValidity}
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
            defaultChecked
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
          />
          Cold
        </label>
      </div>
    </>
  );
}

export default AddItemModal;
