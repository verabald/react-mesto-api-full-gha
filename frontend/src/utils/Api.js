class Api {
  constructor() {
    this._url = 'https://backend.verbaldi.nomoredomainsicu.ru';
    this._headers = 'application/json';
    this._authorization = `Bearer ${localStorage.getItem('jwt')}`;
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

  getInitialCards() {
    return this._request(`${this._url}/cards`, {
      headers: {
        'Authorization': this._authorization,
        'Content-Type': this._headers,
    },
    });
  }

  addCard(card) {
    return this._request(`${this._url}/cards`, {
      method: "POST",
      headers: {
        'Authorization': this._authorization,
        'Content-Type': this._headers,
    },
      body: JSON.stringify({
        name: card.name,
        link: card.link,
      }),
    });
  }

  deleteCard(id) {
    return this._request(`${this._url}/cards/${id}`, {
      method: "DELETE",
      headers: {
        'Authorization': this._authorization,
        'Content-Type': this._headers,
    },
    });
  }

  changeLikeCardStatus(id, isLiked) {
    return this._request(`${this._url}/cards/${id}/likes`, {
      method: isLiked ? "PUT" : "DELETE",
      headers: {
        'Authorization': this._authorization,
        'Content-Type': this._headers,
    },
    });
  }

  getUserInfoApi() {
    return this._request(`${this._url}/users/me`, {
      headers: {
        'Authorization': this._authorization,
        'Content-Type': this._headers,
    },
    });
  }

  setUserInfoApi(data) {
    return this._request(`${this._url}/users/me`, {
      method: "PATCH",
      headers: {
        'Authorization': this._authorization,
        'Content-Type': this._headers,
    },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    });
  }

  setAvatar(data) {
    return this._request(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        'Authorization': this._authorization,
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
