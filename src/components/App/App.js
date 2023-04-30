import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import {
  Redirect,
  useHistory,
} from "react-router-dom/cjs/react-router-dom.min";
import { TemperatureContext } from "../../contexts/TemperatureContext";
import { ValidationContext } from "../../contexts/ValidationContext";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./App.css";
import "../../fonts/fonts.css";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import DeleteCardModal from "../DeleteCardModal/DeleteCardModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import { getWeatherData, filterWeatherData } from "../../utils/weatherAPI";
import { apiKey, lat, long } from "../../utils/constants";
import { getCards, addCard, deleteCard } from "../../utils/api";
import { checkToken, signin, signup } from "../../utils/auth";

const App = () => {
  const [weatherData, setWeatherData] = useState({});
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [disableButton, setDisableButton] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});

  const history = useHistory();

  function handleSubmitButtonChange() {
    setDisableButton(!disableButton);
  }

  function handleSignupSubmit(email, password, name, avatar) {
    setIsLoading(true);

    const user = { email, password, name, avatar };

    signup(user)
      .then((res) => {
        handleLoginSubmit(email, password);
        closeModal();
        setIsLoading(false);
      })
      .catch((err) => {
        if (err === "Error: 409") {
          alert("This user already exists, please use a unique email address.");
        }
        setIsLoading(false);
        console.log(err);
      });
  }

  function handleLoginSubmit(email, password) {
    setIsLoading(true);

    const user = { email, password };

    signin(user)
      .then((res) => {
        localStorage.setItem("token", res.token);

        checkToken(res.token).then((res) => {
          setUserData(JSON.parse(JSON.stringify(res.data)));
        });

        setLoggedIn(true);
        closeModal();
        history.push("/");
        setIsLoading(false);
      })
      .catch((err) => {
        if (err === "Error: 401") {
          alert("Invalid username or password.");
        }
        setIsLoading(false);
        console.log(err);
      });
  }

  function handleUpdateSubmit() {
    console.log("Update Submit");
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

  function handleEditProfile() {
    setActiveModal("edit");
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

  function checkAccess() {
    const jwt = localStorage.getItem("token");

    if (jwt) {
      checkToken(jwt)
        .then((res) => {
          setUserData(JSON.parse(JSON.stringify(res.data)));
          setLoggedIn(true);
        })
        .catch((err) => {
          console.log("No token found ", err.message);
        });
    } else {
      console.log("no jwt");
    }
  }

  function handleSignOut() {
    setLoggedIn(false);
    localStorage.removeItem("token");
    history.push("/");
  }

  useEffect(() => {
    getCards()
      .then((items) => {
        setClothingItems(items);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [loggedIn]);

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
    checkAccess();
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
      <CurrentUserContext.Provider value={{ userData }}>
        <TemperatureContext.Provider
          value={{
            currentTemperatureUnit,
            weatherData,
            handleToggleSwitchChange,
          }}
        >
          <Header
            userData={userData}
            weatherData={weatherData}
            onAddClothes={handleAddClothes}
            onSignup={handleSignup}
            onSignin={handleSignin}
            loggedIn={loggedIn}
          />
          <Switch>
            <ProtectedRoute path='/profile' loggedIn={loggedIn}>
              <Profile
                userData={userData}
                cards={clothingItems}
                onCardClick={handleCardClick}
                addClothes={handleAddClothes}
                handleEditProfile={handleEditProfile}
                handleSignOut={handleSignOut}
              />
            </ProtectedRoute>
            <Route path='/main'>
              <Main
                weatherData={weatherData}
                cards={clothingItems}
                onCardClick={handleCardClick}
              />
            </Route>
            <Route path='/'>
              {loggedIn ? <Redirect to='/profile' /> : <Redirect to='/main' />}
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
        {activeModal === "edit" && (
          <ValidationContext.Provider
            value={{
              disableButton,
              setDisableButton,
              handleSubmitButtonChange,
              closeActiveModal,
              handleUpdateSubmit,
              setActiveModal,
            }}
          >
            <EditProfileModal isLoading={isLoading} />
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
      </CurrentUserContext.Provider>
    </div>
  );
};

export default App;
