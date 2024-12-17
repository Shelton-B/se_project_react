import "./Sidebar.css";
import avatar from "../../../images/avatar1.png";
import React, { useContext } from "react";
import { CurrentUserContext } from "../../../contexts/CurrentUserContext";

function Sidebar({ handleEditProfileClick, handleSignOut }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="sidebar">
      <img
        className="sidebar__avatar"
        src={currentUser.avatar}
        alt={currentUser.name}
      />
      <p className="sidebar__username">{currentUser.name}</p>
      <div className="sidebar__info">
        <button
          onClick={handleEditProfileClick}
          className="sidebar__btn"
          type="button"
        >
          Change Profile Data
        </button>
        <button onClick={handleSignOut} className="sidebar__btn" type="button">
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
