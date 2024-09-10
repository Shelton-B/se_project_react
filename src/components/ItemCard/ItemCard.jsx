import "../ItemCard/ItemCard.css";

function ItemCard({ item, handleCardClick }) {
  const cardClick = () => {
    handleCardClick(item);
    console.log(item);
  };

  return (
    <li className="card">
      <h2 className="card__title">{item.name}</h2>
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
