import { useContext } from "react";
import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

export default function Main(props) {
  const user = useContext(CurrentUserContext);

  return (
    <main className="main section">
      <section className="profile">
        <div className="profile__item">
          <button
            className="profile__avatar button"
            type="button"
            onClick={props.onEditAvatar}
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
              onClick={props.onEditProfile}
            />
            <p className="profile__profession">{user.about}</p>
          </div>
        </div>
        <button
          className="profile__add-button button"
          type="button"
          onClick={props.onAddPlace}
        />
      </section>

      <section className="elements" aria-label="Галерея картинок">
        <ul className="elements__list">
          {props.cards.map((card) => (
            <Card
              card={card}
              key={card._id}
              name={card.name}
              link={card.link}
              likes={card.likes.length}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}
