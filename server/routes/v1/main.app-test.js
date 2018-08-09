/* eslint-env mocha */
import faker from 'faker';
import { HTTP } from 'meteor/http';
import { Meteor } from 'meteor/meteor';
import { assert } from 'chai';

process.env.TOKEN = faker.random.uuid();

describe('Check V1 routes:', () => {
  const url = Meteor.absoluteUrl('/v1/test');

  it('Correct POST', (done) => {
    HTTP.post(url, {
      data: { token: process.env.TOKEN },
    }, (error, response) => {
      assert.isBoolean(response.data.answer);
      assert.isTrue(response.data.answer);
      done();
    });
  });

  it('Incorrect POST', (done) => {
    HTTP.post(url, {}, (error, response) => {
      assert.isBoolean(response.data);
      assert.isFalse(response.data);
      done();
    });
  });

  it('Correct GET', (done) => {
    HTTP.get(url, {
      params: { token: process.env.TOKEN },
    }, (error, response) => {
      assert.isBoolean(response.data.answer);
      assert.isTrue(response.data.answer);
      done();
    });
  });

  it('Incorrect GET', (done) => {
    HTTP.get(url, {}, (error, response) => {
      assert.isBoolean(response.data);
      assert.isFalse(response.data);
      done();
    });
  });

  it('Non-existent method', (done) => {
    const method = faker.random.uuid();
    const endpoints = Meteor.absoluteUrl(`/v1/${method}`);
    HTTP.get(endpoints, {}, (error, response) => {
      assert.isBoolean(response.data);
      assert.isFalse(response.data);
      done();
    });
  });
});
