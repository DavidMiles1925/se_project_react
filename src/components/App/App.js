import React, { useState, useEffect } from "react";
import "./App.css";
import "../../fonts/fonts.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { getWeatherData, filterWeatherData } from "../../utils/weatherAPI";
import { apiKey, lat, long, defaultClothingItems } from "../../utils/constants";
import ItemModal from "../ItemModal/ItemModal";

const App = () => {
  const [weatherData, setWeatherData] = useState({});
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [activeModal, setActiveModal] = useState();
  const [selectedCard, setSelectedCard] = useState(null);

  function handleAddClothes() {
    setActiveModal("create");
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setActiveModal("preview");
  }

  function closeActiveModal(evt) {
    if (
      evt.target.classList.contains("modal") ||
      evt.target.classList.contains("modal__close")
    ) {
      setActiveModal();
    }
  }

  useEffect(() => {
    if (lat && long) {
      getWeatherData(lat, long, apiKey)
        .then((data) => {
          setWeatherData(filterWeatherData(data));
        })
        .catch((err) => console.log(err));
    }
  }, []);

  useEffect(() => {
    const handleEscClose = (evt) => {
      if (evt.key === "Escape") {
        setActiveModal();
      }
    };
    document.addEventListener("keydown", handleEscClose);
    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, []);

  return (
    <div className='App'>
      <Header weatherData={weatherData} onClick={handleAddClothes} />
      <Main
        weatherData={weatherData}
        cards={clothingItems}
        onCardClick={handleCardClick}
      />
      <Footer />
      {activeModal === "create" && (
        <ModalWithForm
          title='New Garment'
          name='new-card'
          buttonText='Add Garment'
          onClose={closeActiveModal}
        >
          <label className='modal__label'>Name</label>
          <input
            className='modal__input modal__input_type_card-name'
            type='text'
            name='name'
            id='name'
            placeholder='Title'
            required
            minLength='1'
            maxLength='30'
          />
          <span className='modal__error' id='name-error'></span>

          <label className='modal__label'>Link</label>
          <input
            className='modal__input modal__input_type_link'
            type='url'
            name='link'
            id='link'
            placeholder='URL'
            required
          />
          <span className='modal__error' id='link-error'></span>
          <label className='modal__label'>Select the weather type</label>
          <div className='modal__radio-container'>
            <input
              className='modal__input modal__input_type_radio'
              type='radio'
              name='weatherType'
              id='choiceHot'
              value='hot'
            />
            <label className='modal__label'>Hot</label>
          </div>
          <div className='modal__radio-container'>
            <input
              className='modal__input modal__input_type_radio'
              type='radio'
              name='weatherType'
              id='choiceWarm'
              value='warm'
            />
            <label className='modal__label'>Warm</label>
          </div>
          <div className='modal__radio-container'>
            <input
              className='modal__input modal__input_type_radio'
              type='radio'
              name='weatherType'
              id='choiceCold'
              value='cold'
            />
            <label className='modal__label'>Cold</label>
          </div>
        </ModalWithForm>
      )}
      {activeModal === "preview" && (
        <ItemModal card={selectedCard} onClose={closeActiveModal} />
      )}
    </div>
  );
};

export default App;
