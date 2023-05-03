import "./ItemModal.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext } from "react";

function ItemModal({ card, onClose, onDelete }) {
  const { currentUser } = useContext(CurrentUserContext);

  const isOwn = card.owner === currentUser._id;

  return (
    <div className='modal modal__preview' onClick={onClose}>
      <div className='modal__container'>
        <button className='modal__close modal__close-item' onClick={onClose} />
        <img className='modal__image' src={card.imageUrl} alt={card.name} />
        <div className='modal__description-wrapper'>
          <p className='modal__description'>{card.name}</p>
          {isOwn && (
            <p className='modal__delete-link' onClick={onDelete}>
              Delete Item
            </p>
          )}
        </div>
        <p className='modal__description'>Weather: {card.weather}</p>
        <p className='modal__description'>Likes: {card.likes.length}</p>
      </div>
    </div>
  );
}

export default ItemModal;
