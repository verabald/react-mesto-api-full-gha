import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import FormForAuth from "./FormForAuth.js";
import auth from "../utils/Auth.js";

export default function Register({
  onChange,
  setAuthCheck,
  setEmail,
  values,
  setValue,
  isOpen,
}) {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");

  function onRegister(evt) {
    evt.preventDefault();

    auth
      .getRegister(values)
      .then((data) => {
        setEmail(data.data.email);
        setPassword(values.password);
        setValue({ email: "", password: "" });
        navigate("/sign-in", { replace: true });
        setAuthCheck(true);
        isOpen(true);
      })
      .catch(() => {
        setAuthCheck(false);
        isOpen(true);
      });
  }

  return (
    <>
      <FormForAuth
        values={values}
        type={"Регистрация"}
        onChange={onChange}
        onSubmit={onRegister}
      />
      <p className="auth__caption">
        Уже зарегистрированы?{" "}
        <Link className="auth__button-login" to="/sign-in">
          Войти
        </Link>
      </p>
    </>
  );
}
