import { action, makeAutoObservable, runInAction } from "mobx";

import { accountApi } from "../services/api/auth.api";

class AuthStore {
  isAuth = false;
  token = null;
  user = null;
  wrongLogin = false;
  username = null;
  theme = 'light';
  userAvatar = null;

  constructor() {
    makeAutoObservable(this);
    this.isAuth = localStorage.getItem("isAuth");
    this.token = localStorage.getItem("token");
    this.username = localStorage.getItem("username");
    this.user = JSON.parse(localStorage.getItem("user"));
    this.userAvatar = localStorage.getItem("userAvatar");
  }

  fetchUserLogin(userName, password) {
    accountApi
      .postLogin(userName, password)
      .then(
        action((res) => {
          if (res.succeeded) {
            this.isAuth = true;
            this.token = res.data.token;
            this.fetchGetUser(userName);
            localStorage.setItem("token", this.token);
            localStorage.setItem("isAuth", this.isAuth);
            localStorage.setItem("username", userName);
          }
        })
      )
      .catch(action((err) => {
        if (err.response.status >= 400) { this.wrongLogin = true }
        else if (err.response.status >= 500) window.alert('Ошибка сервера, попробуйте позже')
      }));
  }

  fetchGetUser(userName) {
    accountApi.getProfile(userName).then(
      action((res) => {
        this.user = res.data;
        runInAction(() => this.setUser(this.user));
      })
    ).catch(action((err) => { console.log(err.response) }));
  }

  fetchUserRegister(value) {
    accountApi
      .postRegister(value)
      .then(
        action((res) => {
          if (res.succeeded) {
            this.fetchUserLogin(value.userName, value.password);
          }
        })
      ).catch(action((err) => { console.log(err); if (err.response.status >= 500) window.alert('Ошибка сервера, попробуйте позже'); }));
  }

  changeWrongLogin() {
    this.wrongLogin = false;
  }

  setUserAvatar(base64String) {
    localStorage.setItem('userAvatar', base64String);
    window.location.reload();
  }

  putProfileUpdate(firstName, lastName, patronymic) {
    const id = this.user.id
    accountApi.putProfileUpdate(id, firstName, lastName, patronymic)
    this.setUser({ firstName, lastName, patronymic })
  }
  setUser(user) {
    localStorage.setItem("user", JSON.stringify(user))

  }
}

export default new AuthStore();
