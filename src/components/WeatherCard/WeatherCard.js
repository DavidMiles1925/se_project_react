import "./WeatherCard.css";
import { weatherImages } from "../../utils/constants";
import imageError from "../../images/question.png";

function WeatherCard({ weatherData, deg, unit }) {
  const MILLISECONDS_TO_SECONDS = 1000;
  const isDay =
    Date.now() / MILLISECONDS_TO_SECONDS > weatherData.sunrise &&
    Date.now() / MILLISECONDS_TO_SECONDS < weatherData.sunset;

  const backColor = isDay ? "rgba(0, 163, 255, 1)" : "rgba(40, 104, 151, 1)";
  const backImage = weatherImages.find((item) => {
    return (
      (weatherImages.isDay === isDay &&
        item.condition === weatherData.condition) ||
      imageError
    );
  });

  return (
    <div
      className='weather'
      style={{
        backgroundColor: backColor,
        backgroundImage: `url(${backImage})`,
      }}
    >
      <p className='weather__temp'>
        {deg}°{unit}
      </p>
      <p></p>
    </div>
  );
}

export default WeatherCard;
