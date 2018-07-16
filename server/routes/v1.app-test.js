/* eslint-env mocha */
import faker from 'faker';
import { HTTP } from 'meteor/http';
import { Meteor } from 'meteor/meteor';
import { assert } from 'chai';

process.env.TOKEN = faker.random.uuid();

describe('Верификация запросов:', () => {
  const url = Meteor.absoluteUrl('/v1/test');

  it('Корректный POST', (done) => {
    HTTP.post(url, {
      data: { token: process.env.TOKEN },
    }, (error, result) => {
      assert.isBoolean(result.data);
      assert.isTrue(result.data);
      done();
    });
  });

  it('Некорректный POST', (done) => {
    HTTP.post(url, {}, (error, result) => {
      assert.isBoolean(result.data);
      assert.isFalse(result.data);
      done();
    });
  });

  it('Корректный GET', (done) => {
    HTTP.get(url, {
      params: { token: process.env.TOKEN },
    }, (error, result) => {
      assert.isBoolean(result.data);
      assert.isTrue(result.data);
      done();
    });
  });

  it('Некорректный GET', (done) => {
    HTTP.get(url, {}, (error, result) => {
      assert.isBoolean(result.data);
      assert.isFalse(result.data);
      done();
    });
  });
});
