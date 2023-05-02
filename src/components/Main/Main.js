import { useContext } from "react";
import { TemperatureContext } from "../../contexts/TemperatureContext";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { convertTemp, weatherTemp } from "../../utils/tempLogic";
import "./Main.css";

function Main({ weatherData, cards, onCardClick, handleLikeCard }) {
  const { currentTemperatureUnit } = useContext(TemperatureContext);
  const deg = convertTemp(weatherData.temp, currentTemperatureUnit);
  const weatherType = weatherTemp(weatherData.temp);

  return (
    <main className='main'>
      <WeatherCard
        weatherData={weatherData}
        deg={deg}
        unit={currentTemperatureUnit}
      />
      <section className='main__clothes'>
        <div className='main__description-container'>
          <p className='main__description'>
            Today is {deg} and it is {weatherType}. / You may want to wear:
          </p>
        </div>
        <ul className='main__items'>
          {cards
            .filter((card) => card.weather === weatherType)
            .map((filteredCard) => (
              <ItemCard
                key={filteredCard._id}
                card={filteredCard}
                onCardClick={onCardClick}
                handleLikeCard={handleLikeCard}
              />
            ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
