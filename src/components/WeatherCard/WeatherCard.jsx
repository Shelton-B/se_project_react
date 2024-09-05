import sunny from "../../images/sunny.png";
import "../WeatherCard/WeatherCard.css";
import { CurrentTemperatureUnitContext } from "../../contexts/currentTemperatureUnitContext";
import { useContext } from "react";

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  return (
    <section className="weather__card">
      <p className="weather-card__temp">
        {" "}
        {weatherData.temp[currentTemperatureUnit]} &deg;{" "}
        {currentTemperatureUnit}
      </p>

      <img
        className="weather-card__image"
        src={sunny}
        alt="Weather Image"
      ></img>
    </section>
  );
}

export default WeatherCard;
