export default class UserInfo {
  constructor(nameSelector, aboutSelector) {
    this._name = document.querySelector(nameSelector);
    this._about = document.querySelector(aboutSelector);
  }
  getUserInfo(data) {
    this._name = data.name;
    this._about = data.about;
  }
  setUserInfo(namePopup, aboutPopup) {
    this._name.textContent = namePopup;
    this._about.textContent = aboutPopup;
  }
}