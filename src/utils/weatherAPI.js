function getWeatherData(lat, long, authToken) {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${authToken}`
  ).then((res) => {
    if (res.ok) {
      return res.json();
    }

    console.log(`Error: ${res.status}`);
    return Promise.reject(`Error: ${res.status}`);
  });
}

function filterWeatherData(data) {
  if (!data) {
    return null;
  } else {
    const weather = {};
    weather.city = data.name;
    weather.temp = data.main.temp;
    weather.condition = data.weather[0].main;
    weather.sunrise = data.sys.sunrise;
    weather.sunset = data.sys.sunset;
    return weather;
  }
}

export { getWeatherData, filterWeatherData };
