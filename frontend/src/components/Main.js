import { useContext } from "react";
import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

export default function Main({onEditAvatar, onEditProfile, onAddPlace, cards, onCardClick, onCardLike, onCardDelete}) {
  const user = useContext(CurrentUserContext);

  return (
    <main className="main section">
      <section className="profile">
        <div className="profile__item">
          <button
            className="profile__avatar button"
            type="button"
            onClick={onEditAvatar}
          >
            <img
              className="profile__image"
              src={user.avatar}
              alt="Аватар профиля"
            />
          </button>
          <div className="profile__info">
            <h1 className="profile__name">{user.name}</h1>
            <button
              className="profile__edit-button button"
              type="button"
              onClick={onEditProfile}
            />
            <p className="profile__profession">{user.about}</p>
          </div>
        </div>
        <button
          className="profile__add-button button"
          type="button"
          onClick={onAddPlace}
        />
      </section>

      <section className="elements" aria-label="Галерея картинок">
        <ul className="elements__list">
          {cards.map((card) => (
            <Card
              card={card}
              key={card._id}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}
