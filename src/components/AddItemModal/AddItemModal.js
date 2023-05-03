import { useEffect, useContext } from "react";
import { ValidationContext } from "../../contexts/ValidationContext";
import { useFormAndValidation } from "../../utils/useFormAndValidation";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function AddItemModal({ isLoading }) {
  const { setDisableButton, handleAddItemSubmit } =
    useContext(ValidationContext);

  const { values, handleChange, isValid, resetForm } = useFormAndValidation();

  function handleSubmit(e) {
    e.preventDefault();
    handleAddItemSubmit(values);
  }

  useEffect(() => {
    resetForm();
  }, []);

  useEffect(() => {
    setDisableButton(!isValid);
  }, [values, isValid, setDisableButton]);

  return (
    <ModalWithForm
      title='New Garment'
      name='new-card'
      buttonText={isLoading ? "Saving..." : "Save"}
      handleSubmit={handleSubmit}
      alternateButton={{ value: false, text: "", path: "" }}
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
        value={values.name}
        onChange={handleChange}
      />
      <span className='modal__error name__error' id='name_error'></span>
      <label className='modal__label'>Link</label>
      <input
        className='modal__input modal__input_type_text'
        type='url'
        name='link'
        id='link'
        placeholder='URL'
        value={values.link}
        required
        onChange={handleChange}
      />
      <span className='modal__error link__error' id='link_error'></span>
      <label className='modal__label'>Select the weather type</label>
      <div className='modal__radio-container'>
        <label className='modal__label modal__label_type_radio'>
          <input
            className='modal__input modal__input_type_radio'
            type='radio'
            name='weather'
            id='choiceHot'
            value='hot'
            onChange={handleChange}
          />
          Hot
        </label>
      </div>
      <div className='modal__radio-container'>
        <label className='modal__label modal__label_type_radio'>
          <input
            className='modal__input modal__input_type_radio'
            type='radio'
            name='weather'
            id='choiceWarm'
            value='warm'
            onChange={handleChange}
          />
          Warm
        </label>
      </div>
      <div className='modal__radio-container'>
        <label className='modal__label modal__label_type_radio'>
          <input
            className='modal__input modal__input_type_radio'
            type='radio'
            name='weather'
            id='choiceCold'
            value='cold'
            onChange={handleChange}
          />
          Cold
        </label>
      </div>
    </ModalWithForm>
  );
}

export default AddItemModal;
