const apiKey = "5b8e4d2ac9c14802d1aabae0e2efab26";
const lat = "38.857880915973226";
const long = "-94.78542942574806";

const configValidate = {
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const weatherImages = [
  {
    image: "./images/weathercard/Day_Clear.png",
    isDay: true,
    condition: "Clear",
  },
  {
    image: "./images/weathercard/Day_Cloudy.png",
    isDay: true,
    condition: "Clouds",
  },
  {
    image: "./images/weathercard/Day_Rain.png",
    isDay: true,
    condition: "Rain",
  },
  {
    image: "./images/weathercard/Day_Thunderstorm.png",
    isDay: true,
    condition: "Thunderstorm",
  },
  {
    image: "./images/weathercard/Day_Snow.png",
    isDay: true,
    condition: "Snow",
  },
  {
    image: "./images/weathercard/Day_Fog.png",
    isDay: true,
    condition: "Fog",
  },
  {
    image: "./images/weathercard/Day_Fog.png",
    isDay: true,
    condition: "Mist",
  },
  {
    image: "./images/weathercard/Night_Clear.png",
    isDay: false,
    condition: "Clear",
  },
  {
    image: "./images/weathercard/Night_Cloudy.png",
    isDay: false,
    condition: "Clouds",
  },
  {
    image: "./images/weathercard/Night_Rain.png",
    isDay: false,
    condition: "Rain",
  },
  {
    image: "./images/weathercard/Night_Thunderstorm.png",
    isDay: false,
    condition: "Thunderstorm",
  },
  {
    image: "./images/weathercard/Night_Snow.png",
    isDay: false,
    condition: "Snow",
  },
  {
    image: "./images/weathercard/Night_Fog.png",
    isDay: false,
    condition: "Fog",
  },
  {
    image: "./images/weathercard/Night_Fog.png",
    isDay: false,
    condition: "Mist",
  },
];

export { apiKey, lat, long, weatherImages, configValidate };
