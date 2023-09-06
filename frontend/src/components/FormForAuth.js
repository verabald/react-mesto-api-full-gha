export default function FormForAuth({ values, type, onChange, onSubmit }) {
  return (
    <div className="auth__container">
      <h2 className="auth__title">
        {type === "Вход" ? "Вход" : "Регистрация"}
      </h2>
      <form className="auth__form" onSubmit={onSubmit}>
        <input
          value={values.email}
          className="auth__input"
          id="field-email"
          type="email"
          name="email"
          placeholder="Email"
          onChange={onChange}
        />
        <input
          value={values.password}
          className="auth__input"
          id="field-password"
          type="password"
          name="password"
          placeholder="Пароль"
          minLength="2"
          maxLength="30"
          required
          onChange={onChange}
        />
        <button className="button auth__button">
          {type === "Вход" ? "Войти" : "Зарегистрироваться"}
        </button>
      </form>
    </div>
  );
}
