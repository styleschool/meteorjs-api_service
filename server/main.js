import debug from 'debug';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';

Meteor.methods({
  /**
   * @description Верифицирует пользователя по электронной почте и паролю.
   * @param {Object} options          Параметры
   * @param {String} options.email    Электронная почта
   * @param {String} options.password Пароль пользователя
   * @param {String} options.token    Ключ верификации запроса
   * @returns {Boolean}               Результат проверки
   */
  'authorization' (options = {}) {
    const logger = debug('authorization');
    logger('Gets the package: %O', options);

    /* Checks the token */
    if (!('token' in options) || !(process.env.TOKEN === options.token)) {
      return false;
    }

    /* Checks username and password */
    if (!('email' in options) || !('password' in options)) {
      return false;
    }

    const user = Accounts.findUserByEmail(options.email);
    logger('Looks user: %O', user);

    /* Verifies the user */
    if (user) {
      /* eslint-disable-next-line no-underscore-dangle */
      const check = Accounts._checkPassword(user, options.password);
      logger('Verify password: %O', check);

      if (!('error' in check) && check.userId) {
        return true;
      }
    }

    return false;
  },
  /**
   * @description Выполняет поиск пользователя по электронному адресу.
   * @param {Object} options        Параметры
   * @param {Object} options.email  Электронная почта
   * @param {Object} options.token  Ключ верификации запроса
   * @returns {Object|Boolean}      Результат поиска
   */
  'findUserByEmail' (options = {}) {
    const logger = debug('findUserByEmail');
    logger('Gets the package: %O', options);

    /* Checks the token */
    if (!('token' in options) || !(process.env.TOKEN === options.token)) {
      return false;
    }

    /* Checks username and password */
    if (!('email' in options)) {
      return false;
    }

    const user = Accounts.findUserByEmail(options.email);
    logger('Looks user: %O', user);

    if (user) {
      return user;
    }

    return false;
  },
});
