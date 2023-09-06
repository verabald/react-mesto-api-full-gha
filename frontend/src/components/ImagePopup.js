export default function ImagePopup(props) {
  return (
    <div className={`popup popup_mode_loupe popup_image-opened ${props.card ? `popup_opened` : ""}`}>
      <div className="popup__image-container">
        <button
          className="popup__button-close button"
          type="button"
          onClick={props.onClose}
        />
        <figure className="popup__figure">
          <img
            className="popup__image"
            src={props.card ? props.card.link : ""}
            alt={props.card ? props.card.name : ""}
          />
          <figcaption className="popup__caption">
            {props.card ? props.card.name : ""}
          </figcaption>
        </figure>
      </div>
    </div>
  );
};
