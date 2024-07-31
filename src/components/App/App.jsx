import { useEffect, useState } from "react";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import Footer from "../Footer/Footer";
import { getWeather, filterWeatherData } from "../../utils/weatherapi";
import { coordinates, APIkey } from "../../utils/constants";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: {},
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState([]);

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeModal = () => {
    setActiveModal("");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="page">
      <div className="page__content">
        <Header
          handleAddClick={handleAddClick}
          weatherData={weatherData}
        ></Header>
        <Main
          weatherData={weatherData}
          handleCardClick={handleCardClick}
        ></Main>
        <Footer> Complete & Style Footer </Footer>
      </div>
      <ModalWithForm
        titleText="New garment"
        buttonText="Add garment"
        activeModal={activeModal}
        handleCloseClick={closeModal}
      >
        <label className="modal__label" htmlFor="name">
          Name
          <input
            className="modal__input"
            type="text"
            id="name"
            placeholder="Name"
          />
        </label>
        <label className="modal__label" htmlFor="imageUrl">
          Image
          <input
            className="modal__input"
            type="text"
            id="imageUrl"
            placeholder="Image URL"
          />
        </label>
        <fieldset className="modal__radio-buttons">
          <legend className="modal__legend">Select the weather type:</legend>
          <label className="modal__label modal__label_type_radio" htmlFor="Hot">
            <input
              className="modal__radio-input"
              id="Hot"
              type="radio"
              value="hot"
              name="weather"
            />
            Hot
          </label>
          <label
            className="modal__label modal__label_type_radio"
            htmlFor="Warm"
          >
            <input
              className="modal__radio-input"
              id="Warm"
              type="radio"
              value="warm"
              name="weather"
            />
            Warm
          </label>
          <label
            className="modal__label modal__label_type_radio"
            htmlFor="Cold"
          >
            <input
              className="modal__radio-input"
              id="Cold"
              type="radio"
              value="cold"
              name="weather"
            />
            Cold
          </label>
        </fieldset>
      </ModalWithForm>
      <ItemModal
        activeModal={activeModal}
        card={selectedCard}
        handleCloseClick={closeModal}
      ></ItemModal>
    </div>
  );
}

export default App;
