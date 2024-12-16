import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function EditProfileModal({ isOpen, handleCloseClick, handleEditProfile }) {
  const [data, setData] = useState({
    name: "",
    avatar: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleEditProfile(data);
  };

  return (
    <ModalWithForm
      title="edit-profile"
      titleText="Change Profile Data"
      buttonText="Save changes"
      handleCloseClick={handleCloseClick}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      handleEditProfile={handleEditProfile}
    >
      <label className="modal__label" htmlFor="name">
        Name
        <input
          className="modal__input"
          type="name"
          id="name"
          name="name"
          placeholder="Name"
          value={data.name}
          onChange={handleInputChange}
        />
      </label>

      <label className="modal__label" htmlFor="avatar">
        Avatar URL
        <input
          className="modal__input"
          type="url"
          name="avatar"
          id="avatar"
          placeholder="Avatar URL"
          value={data.avatar}
          onChange={handleInputChange}
        />
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;
