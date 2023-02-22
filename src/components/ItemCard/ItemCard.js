import "./ItemCard.css";

function ItemCard({ key, card, onCardClick }) {
  return (
    <li
      key={key}
      className='card'
      style={{ backgroundImage: `url(${card.link})` }}
      onClick={onCardClick}
    >
      <p className='card__name'>{card.name}</p>
    </li>
  );
}

export default ItemCard;
