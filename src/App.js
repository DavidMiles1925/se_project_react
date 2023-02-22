import React from "react";
import "./App.css";
import "./fonts/fonts.css";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";
import ModalWithForm from "./components/ModalWithForm/ModalWithForm";
import { getWeatherData, filterWeatherData } from "./utils/weatherAPI";
import { apiKey, lat, long, defaultClothingItems } from "./utils/constants";

const App = () => {
  const [weatherData, setWeatherData] = React.useState({});
  const [clothingItems, setClothingItems] = React.useState([]);
  const [activeModal, setActiveModal] = React.useState();
  const [selectedCard, setSelectedCard] = React.useState(null);

  function handleAddClothes() {
    console.log("clothes added");
    setActiveModal("create");
  }

  function handleCardClick() {
    console.log("card clicked");
  }

  function closeAllModals() {
    console.log("modals closed");
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
          onClose={closeAllModals}
        >
          <label className='modal__label'>
            <input
              className='modal__input modal__input_type_card-name'
              type='text'
              name='name'
              id='place-name'
              placeholder='Title'
              required
              minLength='1'
              maxLength='30'
            />
            <span className='modal__error' id='place-name-error'></span>
          </label>
        </ModalWithForm>
      )}
    </div>
  );
};

export default App;
