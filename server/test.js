import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';

/**
 * @description Автоматическое создание тестового пользователя, если служба
 * работает в тестовом режиме. Пользователь создаётся в том случае, если не
 * был создан изначально.
 *
 * Используется для тестирования сторонни плагинов, связанных с сервисом.
 */
Meteor.startup(() => {
  const amount = Meteor.users.find().fetch().length;
  if (process.env.NODE_ENV !== 'production' && amount === 0) {
    Accounts.createUser({
      email: process.env.EMAIL || 'example@domain.org',
      password: process.env.PASSWORD || 'qwerty123456',
      profile: {
        firstname: 'Ada',
        lastname: 'Lovelace',
      },
    });
  }
});
