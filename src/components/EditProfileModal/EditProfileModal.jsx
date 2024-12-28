import React, { useContext, useEffect, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function EditProfileModal({ isOpen, handleCloseClick, handleEditProfile }) {
  const currentUser = useContext(CurrentUserContext);

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

  useEffect(() => {
    if (isOpen) {
      setData({ name: currentUser.name, avatar: currentUser.avatar });
    }
  }, [isOpen]);

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
          name="name"
          id="name"
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

      <div className="modal__submit-container">
        <button className="modal__submit" type="submit">
          Save Changes
        </button>
      </div>
    </ModalWithForm>
  );
}

export default EditProfileModal;
