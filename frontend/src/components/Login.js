import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import FormForAuth from "./FormForAuth.js";
import auth from "../utils/Auth.js";

export default function Login({
  onLogin,
  onChange,
  setAuthCheck,
  setEmail,
  values,
  setValue,
  isOpen,
}) {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");

  function onLog(evt) {
    evt.preventDefault();

    auth
      .getLogin(values)
      .then((data) => {
        localStorage.setItem("token", data.token);
        onLogin(true);
        setEmail(values.email);
        setPassword(values.password);
        setValue({ email: "", password: "" });
        navigate("/", { replace: true });
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
        type={"Вход"}
        onChange={onChange}
        onSubmit={onLog}
      />
    </>
  );
}
