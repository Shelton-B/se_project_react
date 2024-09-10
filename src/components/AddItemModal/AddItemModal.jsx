import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "../AddItemModal/AddItemModal.css";

function AddItemModal({ isOpen, onAddItem, handleCloseClick }) {
  const [name, setName] = useState("");
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const [imageUrl, setImageUrl] = useState("");
  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
  };

  const [weather, setWeather] = useState("");
  const handleWeatherChange = (e) => {
    setWeather(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem({ name, imageUrl, weather });
  };

  return (
    <ModalWithForm
      title="New Garment"
      titleText="New garment"
      buttonText="Add garment"
      handleCloseClick={handleCloseClick}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label className="modal__label" htmlFor="name">
        Name
        <input
          className="modal__input"
          type="text"
          id="name"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
        />
      </label>
      <label className="modal__label" htmlFor="imageUrl">
        Image
        <input
          className="modal__input"
          type="text"
          id="imageUrl"
          placeholder="Image URL"
          value={imageUrl}
          onChange={handleImageUrlChange}
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        <label className="modal__label modal__label_type_radio" htmlFor="Hot">
          <input
            className="modal__radio-input"
            id="hot"
            type="radio"
            value="hot"
            name="weather"
            onChange={handleWeatherChange}
          />
          Hot
        </label>
        <label className="modal__label modal__label_type_radio" htmlFor="Warm">
          <input
            className="modal__radio-input"
            id="warm"
            type="radio"
            value="warm"
            name="weather"
            onChange={handleWeatherChange}
          />
          Warm
        </label>
        <label className="modal__label modal__label_type_radio" htmlFor="Cold">
          <input
            className="modal__radio-input"
            id="cold"
            type="radio"
            value="cold"
            name="weather"
            onChange={handleWeatherChange}
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
