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
import DeleteCardModal from "../DeleteCardModal/DeleteCardModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import { getWeatherData, filterWeatherData } from "../../utils/weatherAPI";
import { apiKey, lat, long } from "../../utils/constants";
import { getCards, addCard, deleteCard } from "../../utils/api";
import { signup } from "../../utils/auth";

const App = () => {
  const [weatherData, setWeatherData] = useState({});
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [disableButton, setDisableButton] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmitButtonChange() {
    setDisableButton(!disableButton);
  }

  function handleSignupSubmit(email, password, name, avatar) {
    console.log(
      `email: ${email} password: ${password} name: ${name} avatar: ${avatar}`
    );
    setIsLoading(true);
    const user = { email, password, name, avatar };
    signup(user)
      .then(() => {
        closeModal();
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleLoginSubmit(email, password) {
    console.log(`email: ${email} password: ${password}`);
  }

  function handleAddItemSubmit(name, link, weather) {
    setIsLoading(true);
    const id = clothingItems.length + 1;
    const item = { id, name, weather, link };
    addCard(item)
      .then(() => {
        setClothingItems([item, ...clothingItems]);
        closeModal();
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleDeleteCard() {
    setIsLoading(true);
    deleteCard(selectedCard.id)
      .then(() => {
        setClothingItems(
          clothingItems.filter((item) => item.id !== selectedCard.id)
        );
        closeModal();
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleToggleSwitchChange() {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  }

  function handleSignup() {
    setActiveModal("signup");
  }

  function handleSignin() {
    setActiveModal("signin");
  }

  function handleAddClothes() {
    setActiveModal("create");
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setActiveModal("preview");
  }

  function handleConfirmDelete() {
    setActiveModal("confirm");
  }

  function closeActiveModal(evt) {
    if (
      evt.target.classList.contains("modal") ||
      evt.target.classList.contains("modal__close") ||
      evt.target.classList.contains("modal__cancel")
    ) {
      setActiveModal();
    }
  }

  function closeModal() {
    setActiveModal(null);
  }

  useEffect(() => {
    getCards()
      .then((items) => {
        setClothingItems(items);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
    if (!activeModal) return;

    const handleEscClose = (evt) => {
      if (evt.key === "Escape") {
        closeModal();
      }
    };
    document.addEventListener("keydown", handleEscClose);
    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  return (
    <div className='App'>
      <TemperatureContext.Provider
        value={{
          currentTemperatureUnit,
          weatherData,
          handleToggleSwitchChange,
        }}
      >
        <Header
          weatherData={weatherData}
          onAddClothes={handleAddClothes}
          onSignup={handleSignup}
          onSignin={handleSignin}
        />
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
      {activeModal === "signup" && (
        <ValidationContext.Provider
          value={{
            disableButton,
            setDisableButton,
            handleSubmitButtonChange,
            closeActiveModal,
            handleSignupSubmit,
            setActiveModal,
          }}
        >
          <RegisterModal isLoading={isLoading} />
        </ValidationContext.Provider>
      )}
      {activeModal === "signin" && (
        <ValidationContext.Provider
          value={{
            disableButton,
            setDisableButton,
            handleSubmitButtonChange,
            closeActiveModal,
            handleLoginSubmit,
            setActiveModal,
          }}
        >
          <LoginModal isLoading={isLoading} />
        </ValidationContext.Provider>
      )}
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
          <AddItemModal isLoading={isLoading} />
        </ValidationContext.Provider>
      )}
      {activeModal === "preview" && (
        <ItemModal
          card={selectedCard}
          onClose={closeActiveModal}
          onDelete={handleConfirmDelete}
        />
      )}
      {activeModal === "confirm" && (
        <DeleteCardModal
          onClose={closeActiveModal}
          handleDelete={handleDeleteCard}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default App;
