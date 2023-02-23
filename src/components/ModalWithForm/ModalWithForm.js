import "./ModalWithForm.css";

function ModalWithForm({ title, name, buttonText, onClose, children }) {
  return (
    <div className={`modal modal_type_${name}`} onClick={onClose}>
      <div className='modal__window'>
        <button className='modal__close .modal__close-form' onClick={onClose} />
        <h2 className='modal__title'>{title}</h2>
        <form className='modal__form'>
          {children}
          <button className='modal__submit' type='submit'>
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
