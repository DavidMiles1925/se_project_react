import "./Header.css";
import logo from "../../images/logo.svg";
import avatar from "../../images/avatar.png";

const Header = ({ weatherData, onClick }) => {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className='header'>
      <img className='logo' src={logo} alt='logo' />
      <p className='header__date'>
        {currentDate}, {weatherData.city}
      </p>
      <button className='header__button' onClick={onClick}>
        + Add Clothes
      </button>
      <p className='header__username'>David Miles</p>
      <img className='header__avatar' src={avatar} alt='avatar' />
    </header>
  );
};

export default Header;
