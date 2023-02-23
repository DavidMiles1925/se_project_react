import "./ItemModal.css";

function ItemModal({ card, onClose }) {
  return (
    <div className='modal modal__preview' onClick={onClose}>
      <div className='modal__container'>
        <button className='modal__close modal__close-item' onClick={onClose} />
        <img className='modal__image' src={card.link} alt='card' />
        <p className='modal__description'>{card.name}</p>
        <p className='modal__description'>Weather: {card.weather}</p>
      </div>
    </div>
  );
}

export default ItemModal;
