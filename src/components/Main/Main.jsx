import WeatherCard from "../WeatherCard/WeatherCard";
// import { defaultClothingItems } from "../../utils/constants";
import ItemCard from "../ItemCard/ItemCard";
import "../Main/Main.css";
import "/src/index.css";
import { CurrentTemperatureUnitContext } from "../../contexts/currentTemperatureUnitContext";
import { useContext } from "react";

function Main({ weatherData, handleCardClick, clothingItems }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  ``;
  return (
    <main>
      <WeatherCard weatherData={weatherData}></WeatherCard>
      <section className="cards">
        <p className="cards__text">
          {" "}
          Today is {weatherData.temp[currentTemperatureUnit]} &deg;{" "}
          {currentTemperatureUnit}/ You may want to wear:
        </p>
        <ul className="cards__list">
          {clothingItems
            .filter((item) => {
              return item.weather === weatherData.type;
            })
            .map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                ></ItemCard>
              );
            })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
