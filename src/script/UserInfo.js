export default class UserInfo {
  constructor(nameSelector, aboutSelector, avatarSelector) {
    this._name = document.querySelector(nameSelector);
    this._about = document.querySelector(aboutSelector);
    this._avatar = document.querySelector(avatarSelector);
  }
  getUserInfo() {
    return { name: this._name.textContent, about: this._about.textContent };
  }
  setUserInfo(values) {
    this._name.textContent = values.name;
    this._about.textContent = values.about;
    this._avatar.url = values.link;
  }
}
