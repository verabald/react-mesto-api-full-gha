import success from "../images/popup-success.svg";
import fail from "../images/popup-fail.svg";

export default function InfoTooltip({ isOpen, onClose, authCheck }) {
  return (
    <div className={`popup ${isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <button
          className="popup__button-close button"
          type="button"
          onClick={onClose}
        />
        <div className="popup__info">
          <img
            className="popup__sign"
            src={authCheck ? success : fail}
            alt="знак"
          />
          <p className="popup__text">
            {authCheck
              ? "Вы успешно\nзарегистрировались!"
              : "Что-то пошло не так!\nПопробуйте ещё раз."}
          </p>
        </div>
      </div>
    </div>
  );
}
