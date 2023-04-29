import { ValidationContext } from "../../contexts/ValidationContext";
import "./ModalWithForm.css";
import { useContext } from "react";

function ModalWithForm({
  title,
  name,
  buttonText,
  handleSubmit,
  buttonModifier,
  children,
}) {
  const { disableButton, closeActiveModal, setActiveModal } =
    useContext(ValidationContext);

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
            <div className='modal__button-container'>
              <button
                className='modal__submit'
                type='submit'
                disabled={disableButton}
              >
                {buttonText}
              </button>
              {buttonModifier.value && (
                <button
                  className='modal__button-modifier'
                  type='button'
                  onClick={() => setActiveModal(buttonModifier.path)}
                >
                  {buttonModifier.text}
                </button>
              )}
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
