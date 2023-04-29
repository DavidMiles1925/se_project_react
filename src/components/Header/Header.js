import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import avatar from "../../images/avatar.png";
import ToggleSwtich from "../ToggleSwitch/ToggleSwitch";
import "./Header.css";

const Header = ({ weatherData, onAddClothes, onSignup, onSignin }) => {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className='header'>
      <Link to='/'>
        <img className='logo' src={logo} alt='logo' />
      </Link>
      <p className='header__date'>
        {currentDate}, {weatherData.city}
      </p>
      <ToggleSwtich />
      <button
        className='header__button header__button_type_signup'
        onClick={onSignup}
      >
        Sign Up
      </button>
      <button className='header__button' onClick={onAddClothes}>
        + Add Clothes
      </button>
      <button
        className='header__button header__button_type_signup'
        onClick={onSignin}
      >
        Log In
      </button>
      <Link to='/profile' className='header__profile-link'>
        <p className='header__username'>David Miles</p>
        <img className='header__avatar' src={avatar} alt='avatar' />
      </Link>
    </header>
  );
};

export default Header;
