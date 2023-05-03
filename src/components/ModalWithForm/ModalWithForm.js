import { ValidationContext } from "../../contexts/ValidationContext";
import "./ModalWithForm.css";
import { useContext } from "react";

function ModalWithForm({
  title,
  name,
  buttonText,
  handleSubmit,
  alternateButton,
  children,
}) {
  const {
    disableButton,
    closeActiveModal,
    setActiveModal,
    errorDisplay,
    handleModalErrorDisplay,
  } = useContext(ValidationContext);

  return (
    <div className={`modal modal_type_${name}`} onMouseDown={closeActiveModal}>
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
              {alternateButton.value && (
                <button
                  className='modal__button-modifier'
                  type='button'
                  onClick={() => {
                    setActiveModal(alternateButton.path);
                    handleModalErrorDisplay(false, "");
                  }}
                >
                  {alternateButton.text}
                </button>
              )}
              {errorDisplay.value && (
                <p className='modal__error'>{errorDisplay.message}</p>
              )}
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
