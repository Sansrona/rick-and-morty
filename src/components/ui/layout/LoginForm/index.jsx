import React from "react";
import { observer } from "mobx-react-lite";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link, Redirect } from "react-router-dom";

import { LoginSchema } from "../../../../utils/schemes";
import LoginIcon from "../../../icons/LoginIcon";
import PasswordIcon from "../../../icons/PasswordIcon";
import { useStore } from "../../../../providers/store/StoreProvider";
import { Popup } from "../../base";

import styles from "./login.module.scss";

const LoginForm = observer(() => {
  const {authStore} = useStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginSchema),
  });

  const onSubmit = (data) => {
    authStore.fetchUserLogin(data.userName, data.password);
    localStorage.setItem("username", data.userName);

  };

  const onClickPopup = () => {
    authStore.changeWrongLogin();
  }

  return (
    <>
      {authStore.wrongLogin && (
        <Popup className='loginPopup'>
          <p className="h4">Ошибка</p>
          <p className="bodyOne">Введен неверный логин или пароль</p>
          <button className={styles.popupBtn} onClick={onClickPopup}>Ок</button>
        </Popup>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputField}>
          <label className="bodyOne" htmlFor="userName">
            Логин
          </label>
          <div>
            <LoginIcon />
            <input placeholder="Логин" {...register("userName")} />
          </div>
          <p>{errors.userName?.message}</p>
        </div>

        <div className={styles.inputField}>
          <label className="bodyOne" htmlFor="userName">
            Пароль
          </label>
          <div>
            <PasswordIcon />
            <input
              type="password"
              placeholder="Пароль"
              {...register("password")}
            />
          </div>
          <p>{errors.password?.message}</p>
        </div>
        <button type="submit" className={styles.submit}>
          <span className="h5">Войти</span>
        </button>

        <div className={styles.footer}>
          <span className="bodyOne">У вас еще нет аккаунта?</span>
          <Link to="/register">Создать</Link>
        </div>
      </form>
      {authStore.isAuth && <Redirect to="/" />}
    </>
  );
});
export default LoginForm;
