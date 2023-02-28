import { ValidationContext } from "../../contexts/ValidationContext";
import "./ModalWithForm.css";
import { useContext } from "react";

function ModalWithForm({ title, name, buttonText, handleSubmit, children }) {
  const { disableButton, closeActiveModal } = useContext(ValidationContext);

  return (
    <div className={`modal modal_type_${name}`} onClick={closeActiveModal}>
      <div className='modal__window'>
        <button
          className='modal__close modal__close-form'
          onClick={closeActiveModal}
        />
        <h2 className='modal__title'>{title}</h2>
        <form className='modal__form' onSubmit={handleSubmit}>
          <fieldset className='modal__fieldset'>
            {children}
            <button
              className='modal__submit'
              type='submit'
              disabled={disableButton}
            >
              {buttonText}
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;

/*<FormValidator
settings={configValidate}
formElement={document.querySelector(".modal__form")}
/> */
