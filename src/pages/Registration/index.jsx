import React from "react";
import { observer } from "mobx-react-lite";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useHistory, Redirect } from "react-router-dom";

import { RegisterSchema } from "../../utils/schemes";
import LoginIcon from "../../components/icons/LoginIcon";
import PasswordIcon from "../../components/icons/PasswordIcon";
import { useStore } from "../../providers/store/StoreProvider";

import styles from "./register.module.scss";
import BackArrowIcon from "../../components/icons/BackArrowIcon";

const Registration = observer(() => {
  const { authStore } = useStore();
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(RegisterSchema),
  });

  const onSubmit = (data) => {
    authStore.fetchUserRegister(
      {
        userName: data.userName,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        patronymic:data.patronymic
      }
    );
  };

  const goBack = () => {
    history.goBack();
  };

  return (
    <>
      <span className={styles.header} onClick={goBack}>
        <BackArrowIcon />
      </span>
      <p className="h2">Создать аккаунт</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputField}>
          <label className="bodyOne" htmlFor="firstName">
            Имя
          </label>
          <div>
            <input placeholder="Имя" {...register("firstName")} />
          </div>
          <p>{errors.firstName?.message}</p>
        </div>
        <div className={styles.inputField}>
          <label className="bodyOne" htmlFor="lastName">
            Фамилия
          </label>
          <div>
            <input placeholder="Фамилия" {...register("lastName")} />
          </div>
          <p>{errors.lastName?.message}</p>
        </div>
        <div className={styles.inputField}>
          <label className="bodyOne" htmlFor="patronymic">
            Отчество
          </label>
          <div>
            <input placeholder="Отчество" {...register("patronymic")} />
          </div>
          <p>{errors.patronymic?.message}</p>
        </div>
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
          <span className="h5">Создать</span>
        </button>
      </form>
      {authStore.isAuth && <Redirect to='/' />}
    </>
  );
});

export default Registration;
