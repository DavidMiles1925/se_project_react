import "./ItemCard.css";

function ItemCard({ card, onCardClick }) {
  return (
    <li
      className='card'
      style={{ backgroundImage: `url(${card.link})` }}
      onClick={() => {
        onCardClick(card);
      }}
    >
      <p className='card__name'>{card.name}</p>
    </li>
  );
}

export default ItemCard;
