import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import "./Main.css";

function Main({ weatherData, cards, onCardClick }) {
  const degFahrenheight = (1.8 * (Number(weatherData.temp) - 273) + 32).toFixed(
    1
  );

  const weatherType = () => {
    if (degFahrenheight >= 86) {
      return "hot";
    } else if (degFahrenheight >= 60 && degFahrenheight < 86) {
      return "warm";
    } else {
      return "cold";
    }
  };

  /*        */

  return (
    <main className='main'>
      <WeatherCard weatherData={weatherData} deg={degFahrenheight} />
      <section className='main__clothes'>
        <div className='main__description-container'>
          <p className='main__description'>
            Today is {degFahrenheight} and it is {weatherType()}. / You may want
            to wear:
          </p>
        </div>
        <ul className='main__items'>
          {cards
            .filter((card) => card.weather === weatherType())
            .map((filteredCard) => (
              <ItemCard
                key={filteredCard.id}
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
