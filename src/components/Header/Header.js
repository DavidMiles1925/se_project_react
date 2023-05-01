import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import ToggleSwtich from "../ToggleSwitch/ToggleSwitch";
import "./Header.css";

const Header = ({
  currentUser,
  weatherData,
  onAddClothes,
  onSignup,
  onSignin,
  loggedIn,
}) => {
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
      {!loggedIn && (
        <button
          className='header__button header__button_type_signup'
          onClick={onSignup}
        >
          Sign Up
        </button>
      )}
      {loggedIn && (
        <button className='header__button' onClick={onAddClothes}>
          + Add Clothes
        </button>
      )}
      {!loggedIn && (
        <button
          className='header__button header__button_type_signin'
          onClick={onSignin}
        >
          Log In
        </button>
      )}
      {loggedIn && (
        <Link to='/profile' className='header__profile-link'>
          <p className='header__username'>{currentUser.name}</p>
          <img
            className='header__avatar'
            src={currentUser.avatar}
            alt='avatar'
          />
        </Link>
      )}
    </header>
  );
};

export default Header;
