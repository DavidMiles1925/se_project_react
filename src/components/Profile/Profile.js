import React from "react";
import ItemCard from "../ItemCard/ItemCard";
import avatar from "../../images/avatar.png";
import "./Profile.css";

function Profile({ cards, onCardClick, addClothes }) {
  return (
    <>
      <div className='profile'>
        <div className='profile__side-bar'>
          <div className='profile__info'>
            <img className='profile__avatar' src={avatar} alt='avatar' />
            <p className='profile__username'>David Miles</p>
          </div>
        </div>
        <div className='profile__main'>
          <div className='profile__main-text'>
            <p className='profile__your-items'>Your Items</p>
            <p className='profile__add-clothes' onClick={addClothes}>
              + Add new
            </p>
          </div>
          <ul className='profile__cards'>
            {cards.map((card) => (
              <ItemCard key={card.id} card={card} onCardClick={onCardClick} />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Profile;
