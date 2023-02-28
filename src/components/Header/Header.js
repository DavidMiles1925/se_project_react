import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import avatar from "../../images/avatar.png";
import ToggleSwtich from "../ToggleSwitch/ToggleSwitch";
import "./Header.css";

const Header = ({ weatherData, onClick }) => {
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
      <button className='header__button' onClick={onClick}>
        + Add Clothes
      </button>
      <Link to='/profile' className='header__profile-link'>
        <p className='header__username'>David Miles</p>
        <img className='header__avatar' src={avatar} alt='avatar' />
      </Link>
    </header>
  );
};

export default Header;
