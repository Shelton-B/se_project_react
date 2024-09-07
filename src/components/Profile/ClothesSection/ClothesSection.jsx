import "./ClothesSection.css";
import ItemCard from "../../ItemCard/ItemCard";
// import { defaultClothingItems } from "../../../utils/constants";

function ClothesSection({ handleCardClick, handleAddClick, clothingItems }) {
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
      <ul className="clothes-section__list">
        {clothingItems.length &&
          clothingItems.map((item) => {
            // console.log(clothingItems?.map);
            return (
              <ItemCard
                key={item._id}
                item={item}
                handleCardClick={handleCardClick}
              ></ItemCard>
            );
          })}
      </ul>
    </div>
  );
}

export default ClothesSection;
