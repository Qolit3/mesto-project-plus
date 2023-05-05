enum USER_ERRORS_TEXT {
  NOT_FOUND = 'Пользователь с таким id не найден',
  INVALID_DATA = 'Не удалось создать или обновить пользователя из-за некорректных переданных данных',
  FAILED_LOGIN = 'Неправильные почта и пароль',
  FAILED_AUTHORIZATION = 'Неверный токен',
  NON_UNIQUE_EMAIL = 'Пользователь с таким E-mail уже есть'
}