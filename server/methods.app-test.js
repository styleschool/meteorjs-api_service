/* eslint-env mocha */
import '/server/methods';
import faker from 'faker';

import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import { assert } from 'chai';

describe('Методы:', () => {
  describe('Authorization:', () => {
    const user = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    before(() => {
      Accounts.createUser(user);
    });

    it('Неверный логин', (done) => {
      Meteor.call('authorization', {
        email: faker.internet.email(),
        password: user.password,
      }, (error, result) => {
        assert.isBoolean(result);
        assert.isFalse(result);
        done();
      });
    });

    it('Неверный пароль', (done) => {
      Meteor.call('authorization', {
        email: user.email,
        password: faker.internet.password(),
      }, (error, result) => {
        assert.isBoolean(result);
        assert.isFalse(result);
        done();
      });
    });

    it('Корректный пользователь', (done) => {
      Meteor.call('authorization', user, (error, result) => {
        assert.isBoolean(result);
        assert.isTrue(result);
        done();
      });
    });
  });

  describe('Get user by email:', () => {
    const email = faker.internet.email();

    before(() => {
      Accounts.createUser({ email });
    });

    it('Неверный логин', (done) => {
      Meteor.call('get_user_by_email', {
        email: faker.internet.email(),
      }, (error, result) => {
        assert.isEmpty(result);
        assert.isObject(result);
        done();
      });
    });

    it('Корректный пользователь', (done) => {
      Meteor.call('get_user_by_email', { email }, (error, result) => {
        assert.isNotEmpty(result);
        assert.isObject(result);
        done();
      });
    });
  });

  describe('Test:', () => {
    it('True', (done) => {
      Meteor.call('test', (error, result) => {
        assert.isBoolean(result);
        assert.isTrue(result);
        done();
      });
    });
  });
});
