import "../App/App.css";
import "../Header/Header.css";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import logo from "../../images/logo.svg";
import avatar from "../../images/avatar1.png";
import { Link } from "react-router-dom";

function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <Link to="/" className="header__link">
        <img className="header__logo" src={logo} alt="logo"></img>
      </Link>
      <p className="header__date-location">
        {currentDate}, {weatherData.city}
      </p>
      <div className="header__user-container">
        <ToggleSwitch />
        <button
          onClick={handleAddClick}
          className="header__button"
          type="button"
        >
          + Add clothes
        </button>

        <Link to="/profile" className="header__link">
          <p className="header__username">Shelton Brockett</p>
          <img
            src={avatar}
            alt="Shelton Brockett"
            className="header__avatar"
          ></img>
        </Link>
      </div>
    </header>
  );
}

export default Header;
