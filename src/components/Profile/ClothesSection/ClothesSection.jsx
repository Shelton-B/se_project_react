import "./ClothesSection.css";
import ItemCard from "../../ItemCard/ItemCard";
import React, { useContext } from "react";
import { CurrentUserContext } from "../../../contexts/CurrentUserContext";

function ClothesSection({ handleCardClick, handleAddClick, clothingItems }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="clothes-section">
      <div className="clothes-section__data">
        <p className="clothes-section__items">Your Items</p>
        <button
          type="button"
          onClick={handleAddClick}
          className="clothes-section__button"
        >
          + Add New
        </button>
      </div>
      {currentUser && (
        <ul className="clothes-section__list">
          {clothingItems.length &&
            clothingItems.map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  handleCardClick={handleCardClick}
                ></ItemCard>
              );
            })}
        </ul>
      )}
    </div>
  );
}

export default ClothesSection;
