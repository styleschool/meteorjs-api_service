import debug from 'debug';

import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';

Meteor.methods({
  /**
   * @description Верификация пользователя по данным для входа в систему.
   *
   * @param   {Object}  options           Входные параметры
   * @param   {String}  options.email     Электронная почта
   * @param   {String}  options.password  Пароль пользователя
   * @returns {Boolean}                   Результат проверки
   */
  'v1:authorization' (options = {}) {
    const logger = debug('API:v1:authorization');
    logger('Получены данные: %o', options);

    if (!('email' in options) || !('password' in options)) {
      throw new Meteor.Error('Missing required parameters');
    }

    const user = Accounts.findUserByEmail(options.email);
    logger('Поиск %s: %o', options.email, user);

    if (user) {
      /* eslint-disable-next-line no-underscore-dangle */
      const check = Accounts._checkPassword(user, options.password);
      logger('Проверка пароля %s: %s', options.email, !check.error);

      if (('userId' in check) && !('error' in check)) {
        return true;
      }
    }

    return false;
  },
  /**
   * @description Получение информации о пользователе по электронной почте.
   *
   * @param   {Object}  options       Входные параметры
   * @param   {Object}  options.email Электронная почта
   * @returns {Object}                Результат поиска
   */
  'v1:get_user_by_email' (options = {}) {
    const logger = debug('API:v1:get_user_by_email');
    logger('Получены данные: %o', options);

    if (!('email' in options)) {
      throw new Meteor.Error('Missing required parameters');
    }

    const user = Accounts.findUserByEmail(options.email);
    logger('Поиск %s: %o', options.email, user);

    return user || {};
  },
  /**
   * @description Тестовый метод.
   *
   * @returns {Object}
   */
  'v1:test'() {
    const logger = debug('API:v1:test');
    logger('Вызов тестового метода');
    return { answer: true };
  },
});
