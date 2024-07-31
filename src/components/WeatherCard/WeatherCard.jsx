import sunny from "../../images/sunny.png";
import "../WeatherCard/WeatherCard.css";

function WeatherCard({ weatherData }) {
  return (
    <section className="weather__card">
      <p className="weather-card__temp"> {weatherData.temp.F} &deg;F</p>
      <img className="weather-card__image" src={sunny} alt="sunny"></img>
    </section>
  );
}

export default WeatherCard;
