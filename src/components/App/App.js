import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { TemperatureContext } from "../../contexts/TemperatureContext";
import { ValidationContext } from "../../contexts/ValidationContext";
import "./App.css";
import "../../fonts/fonts.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";

import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import { getWeatherData, filterWeatherData } from "../../utils/weatherAPI";
import { apiKey, lat, long, defaultClothingItems } from "../../utils/constants";

const App = () => {
  const [weatherData, setWeatherData] = useState({});
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [activeModal, setActiveModal] = useState();
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [disableButton, setDisableButton] = useState(true);

  function handleSubmitButtonChange() {
    setDisableButton(!disableButton);
  }

  function handleAddItemSubmit(name, link, weather) {
    const _id = clothingItems.length;
    const item = { _id, name, weather, link };
    setClothingItems([item, ...clothingItems]);
    setActiveModal();
  }

  function handleToggleSwitchChange() {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  }

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
      <TemperatureContext.Provider
        value={{
          currentTemperatureUnit,
          weatherData,
          handleToggleSwitchChange,
        }}
      >
        <Header weatherData={weatherData} onClick={handleAddClothes} />
        <Switch>
          <Route path='/profile'>
            <Profile
              cards={clothingItems}
              onCardClick={handleCardClick}
              addClothes={handleAddClothes}
            />
          </Route>
          <Route path='/'>
            <Main
              weatherData={weatherData}
              cards={clothingItems}
              onCardClick={handleCardClick}
            />
          </Route>
        </Switch>
      </TemperatureContext.Provider>
      <Footer />
      {activeModal === "create" && (
        <ValidationContext.Provider
          value={{
            disableButton,
            setDisableButton,
            handleSubmitButtonChange,
            closeActiveModal,
            handleAddItemSubmit,
          }}
        >
          <AddItemModal />
        </ValidationContext.Provider>
      )}
      {activeModal === "preview" && (
        <ItemModal card={selectedCard} onClose={closeActiveModal} />
      )}
    </div>
  );
};

export default App;
