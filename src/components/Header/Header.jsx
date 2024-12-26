import "../App/App.css";
import "../Header/Header.css";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import logo from "../../images/logo.svg";
import avatar from "../../images/avatar1.png";
import { Link } from "react-router-dom";
import React, { useState, useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Header({
  handleAddClick,
  weatherData,
  handleSignUpClick,
  handleLogInClick,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const currentUser = useContext(CurrentUserContext);

  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  //set false//

  console.log(currentUser);

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
        {currentUser?._id ? (
          <>
            <button
              onClick={handleAddClick}
              className="header__button"
              type="button"
            >
              + Add clothes
            </button>
            <Link to="/profile" className="header__link">
              <p className="header__username">{currentUser.name}</p>
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="header__avatar"
              ></img>
            </Link>
          </>
        ) : (
          <>
            <button
              type="button"
              className="header__button"
              onClick={handleSignUpClick}
            >
              Sign Up
            </button>
            <button
              type="button"
              className="header__button"
              onClick={handleLogInClick}
            >
              Log In
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
