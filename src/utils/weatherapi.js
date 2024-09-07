import { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../contexts/currentTemperatureUnitContext";

export const getWeather = ({ longitude, latitude }, APIkey) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}
        `
  ).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(` Error: ${res.status}`);
    }
  });
};

export const filterWeatherData = (data) => {
  const result = {};
  result.city = data.name;
  result.temp = {
    F: Math.round(data.main.temp),
    C: Math.round(((data.main.temp - 32) * 5) / 9),
  };
  result.type = getWeatherType(result.temp.F);
  result.condition = data.weather[0].main.toLowerCase();
  result.isDay = isDay(data.sys, Date.now());
  return result;
};

const isDay = ({ sunrise, sunset }, now) => {
  return sunrise * 1000 < now && now < sunset * 1000;
};

console.log(isDay);

const getWeatherType = (temperature) => {
  if (temperature >= 80) {
    return "Hot";
  } else if (temperature >= 66) {
    return "Warm";
  } else {
    return "Cold";
  }
};
