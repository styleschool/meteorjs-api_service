/* eslint-env mocha */
import faker from 'faker';

import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import { assert } from 'chai';

describe('Methods v1:', () => {
  describe('Debug:', () => {
    it('True', (done) => {
      Meteor.call('v1:test', (error, result) => {
        assert.isBoolean(result.answer);
        assert.isTrue(result.answer);
        done();
      });
    });
  });

  describe('Authorization:', () => {
    const user = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    before(() => {
      Accounts.createUser(user);
    });

    it('Invalid login', (done) => {
      Meteor.call('v1:authorization', {
        email: faker.internet.email(),
        password: user.password,
      }, (error, result) => {
        assert.isBoolean(result);
        assert.isFalse(result);
        done();
      });
    });

    it('Incorrect password', (done) => {
      Meteor.call('v1:authorization', {
        email: user.email,
        password: faker.internet.password(),
      }, (error, result) => {
        assert.isBoolean(result);
        assert.isFalse(result);
        done();
      });
    });

    it('Correct data', (done) => {
      Meteor.call('v1:authorization', user, (error, result) => {
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

    it('Invalid login', (done) => {
      Meteor.call('v1:get_user_by_email', {
        email: faker.internet.email(),
      }, (error, result) => {
        assert.isEmpty(result);
        assert.isObject(result);
        done();
      });
    });

    it('Correct data', (done) => {
      Meteor.call('v1:get_user_by_email', { email }, (error, result) => {
        assert.isNotEmpty(result);
        assert.isObject(result);
        done();
      });
    });
  });
});
