import { Link } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import logo from "../../images/logo.svg";
import ToggleSwtich from "../ToggleSwitch/ToggleSwitch";
import "./Header.css";
import { useContext } from "react";

const Header = ({ weatherData, onAddClothes, onSignup, onSignin }) => {
  const { isLoggedIn, currentUser, alternateAvatar } =
    useContext(CurrentUserContext);
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className='header'>
      <Link to='/main'>
        <img className='logo' src={logo} alt='logo' />
      </Link>
      <p className='header__date'>
        {currentDate}, {weatherData.city}
      </p>
      <ToggleSwtich />
      {!isLoggedIn && (
        <button
          className='header__button header__button_type_signup'
          onClick={onSignup}
        >
          Sign Up
        </button>
      )}
      {isLoggedIn && (
        <button className='header__button' onClick={onAddClothes}>
          + Add Clothes
        </button>
      )}
      {!isLoggedIn && (
        <button
          className='header__button header__button_type_signin'
          onClick={onSignin}
        >
          Log In
        </button>
      )}
      {isLoggedIn && (
        <Link to='/profile' className='header__profile-link'>
          <p className='header__username'>{currentUser.name}</p>
          {currentUser.avatar !==
          "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Elise.png?etag=0807a449ad64b18fe7cd94781c622e6d" ? (
            <img
              className='header__avatar'
              src={currentUser.avatar}
              alt='avatar'
            />
          ) : (
            <p className='header__default-avatar'>{alternateAvatar}</p>
          )}
        </Link>
      )}
    </header>
  );
};

export default Header;
