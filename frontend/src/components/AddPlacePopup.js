import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    setTitle("");
    setLink("");
  }, [isOpen]);

  function handleChangeTitle(evt) {
    setTitle(evt.target.value);
  }

  function handleChangeLink(evt) {
    setLink(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    onAddPlace({
      name: title,
      link: link,
    });
  }

  return (
    <PopupWithForm
      name={"add"}
      form={"add-card"}
      title={"Новое место"}
      buttonText={"Создать"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        value={title}
        className="popup__input popup__input_field_title"
        id="field-title"
        type="text"
        name="title"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
        onChange={handleChangeTitle}
      />
      <span className="popup__error" id="field-title-error"></span>
      <input
        value={link}
        className="popup__input popup__input_field_link"
        id="field-link"
        type="url"
        name="link"
        placeholder="Ссылка на картинку"
        required
        onChange={handleChangeLink}
      />
      <span className="popup__error" id="field-link-error"></span>
    </PopupWithForm>
  );
}
