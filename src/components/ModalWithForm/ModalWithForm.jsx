import "../ModalWithForm/ModalWithForm.css";

function ModalWithForm({
  children,
  buttonText,
  buttonText2,
  titleText,
  isOpen,
  handleCloseClick,
  onSubmit,
  handleLogInClick,
  handleSignUpClick,
}) {
  return (
    <div className={`modal ${isOpen && "modal_opened"}`}>
      <div className="modal__content">
        <h2 className="modal__title">{titleText}</h2>

        <button
          className="modal__close"
          type="button"
          onClick={handleCloseClick}
        ></button>

        <form onSubmit={onSubmit} className="modal__form">
          {children}
          <div className="modal__submit-container">
            <button className="modal__submit" type="submit">
              {buttonText}
            </button>
            <button
              className="modal__submit"
              type="button"
              id="buttonText2"
              onClick={handleSignUpClick || handleLogInClick}
            >
              {buttonText2}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
