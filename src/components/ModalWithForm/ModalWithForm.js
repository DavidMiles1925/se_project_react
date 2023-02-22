import "./ModalWithForm.css";

function ModalWithForm({ title, name, onClose, children }) {
  return (
    <div className='modal modal__showing'>
      <div className='modal__container'>
        <button className='modal__close' />
        <h1>{title}</h1>
        {children}
      </div>
    </div>
  );
}

export default ModalWithForm;
