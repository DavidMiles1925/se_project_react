import logo from "../../images/logo.svg";
import avatar from "../../images/Avatar.png";
import "./Header.css";

function Header() {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <div className='header'>
      <img className='logo' src={logo} alt='logo' />
      <p className='header__date'>{currentDate}</p>
      <button className='header__button'>+ Add Clothes</button>
      <p className='header__username'>David Miles</p>
      <img className='header__avatar' src={avatar} alt='avatar' />
    </div>
  );
}

export default Header;
