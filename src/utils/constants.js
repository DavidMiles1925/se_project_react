const apiKey = "5b8e4d2ac9c14802d1aabae0e2efab26";
const lat = "38.857880915973226";
const long = "-94.78542942574806";

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

const defaultClothingItems = [
  {
    _id: 0,
    name: "Cap",
    weather: "hot",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Cap.png?etag=f3dad389b22909cafa73cff9f9a3d591",
  },
  {
    _id: 1,
    name: "Hoodie",
    weather: "warm",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Hoodie.png?etag=5f52451d0958ccb1016c78a45603a4e8",
  },
  {
    _id: 2,
    name: "Jacket",
    weather: "cold",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Jacket.png?etag=f4bb188deaa25ac84ce2338be2d404ad",
  },
  {
    _id: 3,
    name: "Sneakers",
    weather: "cold",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Sneakers.png?etag=3efeec41c1c78b8afe26859ca7fa7b6f",
  },
  {
    _id: 4,
    name: "T-Shirt",
    weather: "hot",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/T-Shirt.png?etag=44ed1963c44ab19cd2f5011522c5fc09",
  },
  {
    _id: 5,
    name: "Winter coat",
    weather: "cold",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Coat.png?etag=298717ed89d5e40b1954a1831ae0bdd4",
  },
];

const configValidate = {
  formSelector: ".modal__form",
  formFieldsetSelector: ".modal__fieldset",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit",
  inactiveButtonClass: "modal__submit_inactive",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

export {
  apiKey,
  lat,
  long,
  weatherImages,
  defaultClothingItems,
  configValidate,
};
