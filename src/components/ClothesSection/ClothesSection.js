import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";

function ClothesSection({ cards, onCardClick, addClothes }) {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <>
      <div className='clothes__main-text'>
        <p className='clothes__your-items'>Your Items</p>
        <p className='clothes__add-clothes' onClick={addClothes}>
          + Add new
        </p>
      </div>
      <ul className='clothes__cards'>
        {cards
          .filter((card) => card.owner === currentUser._id)
          .map((filteredCard) => (
            <ItemCard
              key={filteredCard._id}
              card={filteredCard}
              onCardClick={onCardClick}
            />
          ))}
      </ul>
    </>
  );
}

export default ClothesSection;
