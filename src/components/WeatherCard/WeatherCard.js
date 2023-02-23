import "./WeatherCard.css";
import { weatherImages } from "../../utils/constants";
import imageError from "../../images/question.png";

function WeatherCard({ weatherData, deg, unit }) {
  const isDay =
    Date.now() / 1000 > weatherData.sunrise &&
    Date.now() / 1000 < weatherData.sunset
      ? true
      : false;

  let backColor = isDay ? "rgba(0, 163, 255, 1)" : "rgba(40, 104, 151, 1)";
  let backImage = imageError;

  weatherImages.forEach((item) => {
    if (item.isDay === isDay && item.condition === weatherData.condition) {
      backImage = item.image;
      console.log("backImage: ", backImage);
    }
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
