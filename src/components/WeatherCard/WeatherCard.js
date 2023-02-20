import "./WeatherCard.css";
import weatherIcon from "../../images/WeatherCardIcon.png";

function WeatherCard() {
  return (
    <div className='weather'>
      <p className='weather__temp'>75° F</p>
      <img className='weather__image' src={weatherIcon} />
    </div>
  );
}

export default WeatherCard;
