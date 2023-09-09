import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate, Link } from "react-router-dom";
import "../index.css";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import ImagePopup from "./ImagePopup.js";
import Register from "./Register.js";
import Login from "./Login.js";
import InfoTooltip from "./InfoTooltip.js";
import ProtectedRoute from "./ProtectedRoute.js";
import api from "../utils/Api.js";
import auth from "../utils/Auth.js";

function App() {
  const navigate = useNavigate();

  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);

  const [authCheck, setAuthCheck] = useState(false);
  const [signIn, setSignIn] = useState(false);
  const [email, setEmail] = useState("");
  const [values, setValue] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    Promise.all([api.getInitialCards(), api.getUserInfoApi()])
      .then((res) => {
        const [card, user] = res;
        setCards(card);
        setCurrentUser(user);
      })
      .catch(console.error);

    checkToken();
  }, []);

  function checkToken() {
    if (localStorage.getItem("token")) {
      const jwt = localStorage.getItem("token");
      auth
        .checkToken(jwt)
        .then((data) => {
          setSignIn(true);
          setEmail(data.data.email);
          navigate("/", { replace: true });
        })
        .catch(console.error);
    }
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleSignIn(login) {
    setSignIn(login);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
    setIsInfoTooltipPopupOpen(false);
  }

  function handleSubmit(request) {
    request().then(closeAllPopups).catch(console.error);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    function makeRequest() {
      return api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      });
    }
    handleSubmit(makeRequest);
  }

  function handleCardDelete(card) {
    function makeRequest() {
      return api.deleteCard(card._id).then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
      });
    }
    handleSubmit(makeRequest);
  }

  function handleUpdateUser(user) {
    function makeRequest() {
      return api.setUserInfoApi(user).then((res) => {
        setCurrentUser(res);
      });
    }
    handleSubmit(makeRequest);
  }

  function handleUpdateAvatar(avatar) {
    function makeRequest() {
      return api.setAvatar(avatar).then((res) => {
        setCurrentUser(res);
      });
    }
    handleSubmit(makeRequest);
  }

  function handleAddPlaceSubmit(card) {
    function makeRequest() {
      return api.addCard(card).then((res) => {
        setCards([res, ...cards]);
      });
    }
    handleSubmit(makeRequest);
  }

  function handleChange(evt) {
    const { name, value } = evt.target;

    setValue({
      ...values,
      [name]: value,
    });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header userEmail={email} onLogin={handleSignIn} />

        <Routes>
          <Route
            path="/sign-up"
            element={
              <Register
                onChange={handleChange}
                setAuthCheck={setAuthCheck}
                setEmail={setEmail}
                values={values}
                setValue={setValue}
                isOpen={setIsInfoTooltipPopupOpen}
              />
            }
          />
          <Route
            path="/sign-in"
            element={
              <Login
                onLogin={handleSignIn}
                onChange={handleChange}
                setAuthCheck={setAuthCheck}
                email={email}
                setEmail={setEmail}
                values={values}
                setValue={setValue}
                isOpen={setIsInfoTooltipPopupOpen}
              />
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute
                element={Main}
                cards={cards}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                signIn={signIn}
              />
            }
          />
        </Routes>

        <Footer />

        <InfoTooltip
          authCheck={authCheck}
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
