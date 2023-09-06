export default function PopupWithForm({isOpen, onClose, name, title, buttonText, form, children, onSubmit}) {
  return (
    <div className={`popup popup_mode_${name} ${isOpen ? `popup_opened` : ""}`}>
      <div className="popup__container">
        <button
          className="popup__button-close button"
          type="button"
          onClick={onClose}
        />
        <h2 className="popup__title">{title}</h2>
        <form className="popup__form" name={form} onSubmit={onSubmit}>
          {children}
          <button className="popup__button-submit button" type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
};