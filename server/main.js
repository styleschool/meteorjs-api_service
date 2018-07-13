import logger from './debug';
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
    'authorization': function (options) {
        logger('A packet is received %O', options);

        /* Checks the token */
        if (!('token' in options) || !(process.env.TOKEN === options.token)) {
            return false;
        }

        /* Checks username and password */
        if (!('email' in options) || !('password' in options)) {
            return false;
        }

        logger('Search for a user');
        const user = Accounts.findUserByEmail(options.email);
        logger('Result: %O', user);

        /* Verifies the user */
        if (user) {
            logger('Password validation');
            const check = Accounts._checkPassword(user, options.password);
            logger('Result: %O', check);

            if (check) {
                return true;
            }
        }

        return false;
    }
});