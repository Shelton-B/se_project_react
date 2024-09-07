import "./ItemModal.css";

function ItemModal({ isOpen, handleCloseClick, card, onDelete }) {
  const handleDelete = () => {
    onDelete(card._id);
  };

  return (
    <div className={`modal ${isOpen && "modal_opened"}`}>
      <div className="modal__content modal__content_type_image">
        <button
          className="modal__close"
          type="button"
          onClick={handleCloseClick}
        ></button>
        <img className="modal__image" src={card.imageUrl} alt={card.name}></img>
        <div className="modal__footer">
          <h2 className="modal__caption"> {card.name}</h2>
          <p className="modal__weather">Weather: {card.weather} </p>
          <button className="modal__delete-button" onClick={handleDelete}>
            Delete Item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
