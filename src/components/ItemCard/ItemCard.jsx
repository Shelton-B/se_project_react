import "../ItemCard/ItemCard.css";
// import like from "../../images/like.png";
import React, { useContext } from "react";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ItemCard({ item, handleCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  // Check if the item was liked by the current user
  // The likes array should be an array of ids
  const isLiked = item.likes.some((id) => id === currentUser._id);
  const itemLikeButtonClassName = `card__like-btn ${
    isLiked ? "card__like-btn_active" : ""
  }`;

  const cardClick = () => {
    handleCardClick(item);
    console.log(item);
  };

  const handleLike = () => {
    console.log("Item being liked:", item); // This should log the item, check if item._id is present

    onCardLike(item);
  };

  return (
    <li className="card">
      <div className="card__info">
        <h2 className="card__title">{item.name}</h2>
        {currentUser && (
          <button
            onClick={handleLike}
            className={itemLikeButtonClassName}
            type="button"
          ></button>
        )}
      </div>
      <img
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
        onClick={cardClick}
      ></img>
    </li>
  );
}

export default ItemCard;
