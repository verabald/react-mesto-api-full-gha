import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const ref = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({ avatar: ref.current.value }, () => {
      ref.current.value = "";
    });
  }

  return (
    <PopupWithForm
      name={"avatar"}
      form={"add-avatar"}
      title={"Обновить аватар"}
      buttonText={"Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        ref={ref}
        className="popup__input popup__input_field_avatar"
        id="field-avatar"
        type="url"
        name="src"
        placeholder="Ссылка на картинку"
        required
      />
      <span className="popup__error" id="field-avatar-error"></span>
    </PopupWithForm>
  );
}
