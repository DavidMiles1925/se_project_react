import React, { useEffect, useState } from "react";
import "./WeatherCard.css";
import { weatherImages } from "../../utils/constants";
import imageError from "../../images/question.png";

function WeatherCard({ weatherData, deg, unit }) {
  const [backImage, setBackImage] = useState(imageError);
  const [backColor, setBackColor] = useState(
    weatherData.isDay ? "rgba(0, 163, 255, 1)" : "rgba(40, 104, 151, 1)"
  );
  const [backImageObject, setBackImageObject] = useState();

  useEffect(() => {
    setBackImageObject(
      weatherImages.find((item) => {
        return (
          item.condition === weatherData.condition &&
          item.isDay === weatherData.isDay
        );
      })
    );
    setBackColor(
      weatherData.isDay ? "rgba(0, 163, 255, 1)" : "rgba(40, 104, 151, 1)"
    );
  }, [weatherData.condition, weatherData.isDay]);

  useEffect(() => {
    if (typeof backImageObject !== "undefined") {
      setBackImage(backImageObject.image);
    }
  }, [backImageObject]);

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
