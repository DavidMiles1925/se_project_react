import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";

function ClothesSection({ cards, onCardClick, addClothes }) {
  return (
    <>
      <div className='clothes__main-text'>
        <p className='clothes__your-items'>Your Items</p>
        <p className='clothes__add-clothes' onClick={addClothes}>
          + Add new
        </p>
      </div>
      <ul className='clothes__cards'>
        {cards.map((card) => (
          <ItemCard key={card.id} card={card} onCardClick={onCardClick} />
        ))}
      </ul>
    </>
  );
}

export default ClothesSection;
