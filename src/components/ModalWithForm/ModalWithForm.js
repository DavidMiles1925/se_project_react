import { ValidationContext } from "../../contexts/ValidationContext";
import "./ModalWithForm.css";
import { useContext } from "react";

function ModalWithForm({ title, name, buttonText, onClose, children }) {
  const { disableButton } = useContext(ValidationContext);

  return (
    <div className={`modal modal_type_${name}`} onClick={onClose}>
      <div className='modal__window'>
        <button className='modal__close modal__close-form' onClick={onClose} />
        <h2 className='modal__title'>{title}</h2>
        <form className='modal__form'>
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
