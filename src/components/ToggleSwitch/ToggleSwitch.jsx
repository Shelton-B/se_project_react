import React, { useContext } from "react";
import "../ToggleSwitch/ToggleSwitch.css";
import { CurrentTemperatureUnitContext } from "../../contexts/currentTemperatureUnitContext";

const ToggleSwitch = () => {
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext
  );

  return (
    <label className="toggle-switch">
      <input
        className="toggle-switch__box"
        type="checkbox"
        onChange={handleToggleSwitchChange}
      />
      <span
        className={
          currentTemperatureUnit === "C"
            ? "toggle-switch__slider toggle-switch__slider-F"
            : "toggle-switch__slider toggle-switch__slider-C"
        }
      ></span>
      <p
        className={`toggle-switch__temp-F ${
          currentTemperatureUnit === "F" && "switch__active"
        }`}
      >
        F
      </p>
      <p
        className={`toggle-switch__temp-C ${
          currentTemperatureUnit === "C" && "switch__active"
        }`}
      >
        C
      </p>
    </label>
  );
};

export default ToggleSwitch;
