import { instance } from "../http/http.service";

const successResponseHandler = (res) => res.data;

export const accountApi = {
  postLogin(userName, password) {
    return instance
      .post(`Account/Login`, {
        userName,
        password,
      })
      .then(successResponseHandler);
  },

  postRegister(value) {
    return instance
      .post(`Account/Register`,
        { userName: value.userName, password: value.password, firstName: value.firstName, lastName: value.lastName, patronymic: value.patronymic }
      )
      .then(successResponseHandler);
  },
  postRefreshToken(
    token,
    refreshToken = "3fa85f64-5717-4562-b3fc-2c963f66afa6"
  ) {
    return instance
      .post(`Account/RefreshToken`, {
        token,
        refreshToken,
      })
      .then(successResponseHandler);
  },
  getProfile(username) {
    return instance
      .get(`Account/GetProfile?userName=${username}`)
      .then(successResponseHandler);
  },
  putProfileUpdate(userId, firstName, lastName, patronymic) {
    return instance
      .put(`Account/UpdateProfile`, {
        userId,
        firstName,
        lastName,
        patronymic,
      })
      .then(successResponseHandler);
  },
};
