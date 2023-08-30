const OK = 200;
const CREATED = 201;
const BAD_REQUEST = 400;
const UNAUTHORIZED_ERR = 401;
const FORBIDDEN_ERR = 403;
const NOT_FOUND_ERR = 404;
const CONFLICT_ERR = 409;
const SERVER_ERR = 500;
const RESOURCE_ERR = 'Запрашиваемый ресурс не найден';
const USER_NOT_FOUND = 'Запрашиваемый пользователь не найден';
const MOVIE_NOT_FOUND = 'Фильм не найден';
const INCORRECT_CREDENTIALS = 'Неверные почта или пароль';
const INCORRECT_DATA_ERR = 'Переданы некорректные данные';
const INCORRECT_URL = 'Некорректный адрес ссылки';
const INCORRECT_EMAIL = 'Некорректный email';
const AUTHORIZATION_REQUIRED = 'Необходима авторизация';
const ACCESS_DENIED = 'Недостаточно прав для совершения действия';
const USER_EXISTS = 'Пользователь с такой почтой уже зарегистрирован';
const SERVER_FAULT = 'На сервере произошла ошибка';
// eslint-disable-next-line no-useless-escape
const REGEX_URL = /^(https?:\/\/)?([a-z0-9\-]+\.)+[a-z]{2,6}([\/\?\#][^\s]*)?$/;

module.exports = {
  OK,
  CREATED,
  BAD_REQUEST,
  UNAUTHORIZED_ERR,
  FORBIDDEN_ERR,
  NOT_FOUND_ERR,
  CONFLICT_ERR,
  SERVER_ERR,
  RESOURCE_ERR,
  USER_NOT_FOUND,
  MOVIE_NOT_FOUND,
  INCORRECT_CREDENTIALS,
  INCORRECT_DATA_ERR,
  INCORRECT_URL,
  INCORRECT_EMAIL,
  AUTHORIZATION_REQUIRED,
  ACCESS_DENIED,
  USER_EXISTS,
  SERVER_FAULT,
  REGEX_URL,
};
