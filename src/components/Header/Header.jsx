import "../App/App.css";
import "../Header/Header.css";
import logo from "../../images/logo.svg";
import avatar from "../../images/avatar2.1.png";

function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  return (
    <header className="header">
      <img className="header__logo" src={logo}></img>
      <p className="header__date-location">
        {currentDate}, {weatherData.city}
      </p>
      <div className="header__user-container">
        <button
          onClick={handleAddClick}
          className="header__button"
          type="button"
        >
          + Add clothes
        </button>

        <p className="header_username">Shelton Brockett</p>
        <img
          src={avatar}
          alt="Shelton Brockett"
          className="header__avatar"
        ></img>
      </div>
    </header>
  );
}

export default Header;
