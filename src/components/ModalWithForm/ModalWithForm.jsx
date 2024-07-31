import "../ModalWithForm/ModalWithForm.css";

function ModalWithForm({
  children,
  buttonText,
  titleText,
  activeModal,
  handleCloseClick,
}) {
  return (
    <div className={`modal ${activeModal === "add-garment" && "modal_opened"}`}>
      <div className="modal__content">
        <h2 className="modal__title">{titleText}</h2>

        <button
          className="modal__close"
          type="button"
          onClick={handleCloseClick}
        ></button>

        <form className="modal__form">{children} </form>
        <button className="modal__submit" type="submit">
          {buttonText}
        </button>
      </div>
    </div>
  );
}

export default ModalWithForm;
