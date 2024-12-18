import "../ItemCard/ItemCard.css";
import like from "../../images/like.png";

function ItemCard({ item, handleCardClick }) {
  const cardClick = () => {
    handleCardClick(item);
    console.log(item);
  };

  return (
    <li className="card">
      <h2 className="card__title">{item.name}</h2>
      <button className="card__like-btn" type="button"></button>
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
