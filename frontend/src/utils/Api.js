class Api {
  constructor() {
    this._url = 'https://backend.verbaldi.nomoredomainsicu.ru';
    this._headers = 'application/json';
  }

  _request(url, options) {
    return fetch(url, options).then(this._test);
  }

  _test(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
  }

  getInitialCards(token) {
    return this._request(`${this._url}/cards`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': this._headers,
    },
    });
  }

  addCard(card, token) {
    return this._request(`${this._url}/cards`, {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': this._headers,
    },
      body: JSON.stringify({
        name: card.name,
        link: card.link,
      }),
    });
  }

  deleteCard(id, token) {
    return this._request(`${this._url}/cards/${id}`, {
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': this._headers,
    },
    });
  }

  changeLikeCardStatus(id, isLiked, token) {
    return this._request(`${this._url}/cards/${id}/likes`, {
      method: isLiked ? "PUT" : "DELETE",
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': this._headers,
    },
    });
  }

  getUserInfoApi(token) {
    return this._request(`${this._url}/users/me`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': this._headers,
    },
    });
  }

  setUserInfoApi(data, token) {
    return this._request(`${this._url}/users/me`, {
      method: "PATCH",
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': this._headers,
    },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    });
  }

  setAvatar(data, token) {
    return this._request(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': this._headers,
    },
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    });
  }
}

const api = new Api();
export default api;
