import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function RegisterModal({
  isOpen,
  handleCloseClick,
  handleSubmit,
  handleLogIn,
}) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    avatarURL: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <ModalWithForm
      title="sign-up"
      titleText="Sign Up"
      buttonText="Sign Up"
      buttonText2="or Log In"
      handleCloseClick={handleCloseClick}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      handleLogIn={handleLogIn}
    >
      <label className="modal__label" htmlFor="email">
        Email
        <input
          className="modal__input"
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
        />
      </label>

      <label className="modal__label" htmlFor="password">
        Password
        <input
          className="modal__input"
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
        />
      </label>

      <label className="modal__label" htmlFor="name">
        Name
        <input
          className="modal__input"
          type="text"
          id="name"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleInputChange}
        />
      </label>

      <label className="modal__label" htmlFor="name">
        Avatar URL
        <input
          className="modal__input"
          type="url"
          name="avatarURL"
          id="AvatarURL"
          placeholder="Avatar URL"
          value={formData.avatarURL}
          onChange={handleInputChange}
        />
      </label>
    </ModalWithForm>
  );
}

export default RegisterModal;

// reset form after submission //

// const handleSubmit = (e) => {
//   e.preventDefault();
//   console.log("Form submitted:", e);
//   handleCloseClick();
// };
