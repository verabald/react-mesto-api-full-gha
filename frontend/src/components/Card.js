import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card(props) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `elements__like-button button ${
    isLiked && "elements__like-button_active"
  }`;

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <div className="elements__card">
      {isOwn && (
        <button
          className="elements__delete-button button"
          type="button"
          onClick={handleDeleteClick}
        />
      )}
      <img
        className="elements__image"
        src={props.link}
        alt={props.name}
        onClick={handleClick}
      />
      <div className="elements__box">
        <h2 className="elements__caption">{props.name}</h2>
        <div className="elements__box-like">
          <button
            className={cardLikeButtonClassName}
            type="button"
            onClick={handleLikeClick}
          />
          <p className="elements__like-counter">{props.likes}</p>
        </div>
      </div>
    </div>
  );
}
