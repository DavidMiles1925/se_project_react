import "./Header.css";

const Header = ({ weatherData, onClick }) => {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <div className='header'>
      <img className='logo' src='/images/logo.svg' alt='logo' />
      <p className='header__date'>
        {currentDate}, {weatherData.city}
      </p>
      <button className='header__button' onClick={onClick}>
        + Add Clothes
      </button>
      <p className='header__username'>David Miles</p>
      <img className='header__avatar' src='/images/avatar.png' alt='avatar' />
    </div>
  );
};

export default Header;
