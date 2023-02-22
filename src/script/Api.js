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
      .catch((err) => {
        console.log(err);
      });

    return answer;
  }

  getUsers(){
    return this._fetch('/users/me', "GET")
  }

  getInitialCards(){
    return this._fetch('/cards', "GET")
  }

  editingProfile({ name , about}){
    return this._fetch('/users/me', "PATCH", { name , about})
  }

  editingAvatar(avatar){
    return this._fetch('/users/me/avatar', "PATCH", avatar)
  }

  addNewCard({ name, link}){
    return this._fetch('/cards', "POST", { name, link})
  }

  deleteCard(id){
    return this._fetch(`/card/${id}`, "DELETE")
  }

  addLike(id){
    return this._fetch(`/card/${id}/like`, "PUT")
  }

  deleteLike(id){
    return this._fetch(`/card/${id}/like`, "DELETE")
  }
}