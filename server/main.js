import debug from 'debug';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';

Meteor.methods({
  /**
   * @param {Object} options          Параметры
   * @param {String} options.email    Электронная почта
   * @param {String} options.password Пароль пользователя
   * @param {String} options.token    Ключ верификации запроса
   * @returns {Boolean}               Результат проверки
   * @description Верифицирует пользователя по электронной почте и паролю.
   */
  authorization(options = {}) {
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
      const check = Accounts._checkPassword(user, options.password);
      logger('Verify password: %O', check);

      if (!('error' in check) && check.userId) {
        return true;
      }
    }

    return false;
  },
});
