export default class Api {
  constructor({ utl, ...token }) {
    this._utl = utl;
    this._token = token;
  }

  async _fetch(path, method, body) {
    const answer = fetch(this._utl + path, {
      ...this._token,
      method,
      body: JSON.stringify(body),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Что-то пошло не так D: ${res.status}`);
        }
      })
    return answer;
  }

  getUsers() {
    return this._fetch("/users/me", "GET");
  }

  getInitialCards() {
    return this._fetch("/cards", "GET");
  }

  editProfile({ name, about }) {
    return this._fetch("/users/me", "PATCH", { name, about });
  }

  editAvatar(avatar) {
    return this._fetch("/users/me/avatar", "PATCH", avatar);
  }

  addNewCard({ name, link }) {
    return this._fetch("/cards", "POST", { name, link });
  }

  deleteCard(id) {
    return this._fetch(`/cards/${id}`, "DELETE");
  }

  addLike(id) {
    return this._fetch(`/cards/${id}/likes`, "PUT");
  }

  deleteLike(id) {
    return this._fetch(`/cards/${id}/likes`, "DELETE");
  }
}
