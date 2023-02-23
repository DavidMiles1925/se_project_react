import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { convertTemp, weatherTemp } from "../../utils/tempLogic";
import "./Main.css";

function Main({ weatherData, cards, onCardClick }) {
  const unit = "F";
  const deg = convertTemp(weatherData.temp, unit);

  const weatherType = weatherTemp(deg, unit);

  return (
    <main className='main'>
      <WeatherCard weatherData={weatherData} deg={deg} unit={unit} />
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
              />
            ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
