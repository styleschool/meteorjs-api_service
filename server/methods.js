import ERROR from '/server/error';
import debug from 'debug';

import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';

Meteor.methods({
  /**
   * @description Верификация данных пользователя для авторизации.
   *
   * @param   {Object}  options           Входные параметры
   * @param   {String}  options.email     Электронная почта
   * @param   {String}  options.password  Пароль пользователя
   * @returns {Boolean}                   Результат проверки
   */
  'authorization' (options = {}) {
    const logger = debug('API:authorization');

    try {
      if (!('email' in options) || !('password' in options)) {
        throw new Meteor.Error('Error checking arguments');
      }

      const user = Accounts.findUserByEmail(options.email);
      logger('Поиск %s: %o', options.email, user);

      if (user) {
        /* eslint-disable-next-line no-underscore-dangle */
        const check = Accounts._checkPassword(user, options.password);
        logger('Проверка пароля %s: %s', options.email, !check.error);

        if (('error' in check)) {
          throw new Meteor.Error(check.error);
        }

        return true;
      }
    } catch (error) {
      ERROR(error);
      return false;
    }

    return false;
  },
  /**
   * @description Получение данных пользователя по адресу электронной почты.
   *
   * @param   {Object}  options       Входные параметры
   * @param   {Object}  options.email Электронная почта
   * @returns {Object}                Результат поиска
   */
  'get_user_by_email' (options = {}) {
    const logger = debug('API:get_user_by_email');

    try {
      if (!('email' in options)) {
        throw new Meteor.Error('Error checking arguments');
      }

      const user = Accounts.findUserByEmail(options.email);
      logger('Поиск %s: %o', options.email, user);

      return user || {};
    } catch (error) {
      ERROR(error);
      return {};
    }
  },
  /**
   * @description Тестовый метод.
   *
   * @returns {Boolean}
   */
  test() {
    const logger = debug('API:test');
    logger('Вызов тестового метода');
    return { answer: true };
  },
});
