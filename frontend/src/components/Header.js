import logo from "../images/header-logo.svg";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";

export default function Header({ userEmail, onLogin }) {
  const path = useLocation();
  const navigate = useNavigate();

  function exit() {
    localStorage.removeItem("token");
    onLogin(false);
    navigate("/sign-in", { replace: true });
  }

  return (
    <header className="header">
      <Link className="header__link" to={"/"}>
        <img className="header__logo" src={logo} alt="Логотип Место Россия" />
      </Link>
      {path.pathname === "/sign-up" && (
        <Link className="header__button-login" to={"/sign-in"}>
          Войти
        </Link>
      )}
      {path.pathname === "/sign-in" && (
        <Link className="header__button-login" to={"/sign-up"}>
          Регистрация
        </Link>
      )} 
      {path.pathname === "/" && (
        <>
          <div className="header__container">
            <p className="header__email">{userEmail}</p>
            <button onClick={exit} className="button header__button-exit">
              Выйти
            </button>
          </div>
        </>
      )}
    </header>
  );
}
