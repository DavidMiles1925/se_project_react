import React from "react";
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
  const [weatherData, setWeatherData] = React.useState({});
  const [clothingItems, setClothingItems] = React.useState([]);
  const [activeModal, setActiveModal] = React.useState();
  const [selectedCard, setSelectedCard] = React.useState(null);

  function handleAddClothes() {
    console.log("clothes added");
    setActiveModal("create");
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setActiveModal("preview");
  }

  function handleEscClose(evt) {
    if (evt.key === "Escape") {
      setActiveModal();
    }
  }

  function closeAllModals(evt) {
    evt.stopPropagation();
    if (
      evt.target.classList.contains("modal") ||
      evt.target.classList.contains("modal__close")
    ) {
      setActiveModal();
    }
  }

  React.useEffect(() => {
    if (lat && long) {
      getWeatherData(lat, long, apiKey)
        .then((data) => {
          setWeatherData(filterWeatherData(data));
        })
        .catch((err) => console.log(err));
    }
  }, []);

  React.useEffect(() => {
    setClothingItems(defaultClothingItems);
  }, []);

  React.useEffect(() => {
    document.addEventListener("keydown", handleEscClose);
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
          onClose={closeAllModals}
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
        <ItemModal card={selectedCard} onClose={closeAllModals} />
      )}
    </div>
  );
};

export default App;
