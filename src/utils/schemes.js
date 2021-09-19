import * as yup from "yup";

export const LoginSchema = yup.object().shape({
  userName: yup.string().required("Введите ваш никнейм"),
  password: yup
    .string()
    .required("Введите ваш пароль")
});

export const RegisterSchema = yup.object().shape({
  userName: yup.string().required("Введите ваш никнейм"),
  password: yup
    .string()
    .required("Введите ваш пароль")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      "Пароль должен содержать не менее 8 символов, 1 букву, 1 цифру"
    ),
  firstName: yup.string().required("Введите ваше имя"),
  lastName: yup.string().required("Введите вашу фамилию"),
  patronymic: yup.string().required("Введите ваше отчество"),
});


export const UpdateBioSchema = yup.object().shape({
  firstName: yup.string().required("Введите ваше имя"),
  lastName: yup.string().required("Введите вашу фамилию"),
  patronymic: yup.string().required("Введите ваше отчество"),
});


export const UpdateLoginSchema = yup.object().shape({
  userName: yup.string().required("Введите ваш логин"),
});