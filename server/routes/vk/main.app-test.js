/* eslint-env mocha */
import faker from 'faker';

import { HTTP } from 'meteor/http';
import { Meteor } from 'meteor/meteor';
import { assert } from 'chai';

describe('Check VK routes:', () => {
  const url = Meteor.absoluteUrl('/api.vk/callback');
  process.env.VK_TOKEN = faker.random.uuid();

  it('Incorrect POST', (done) => {
    HTTP.post(url, {
      data: { secret: faker.random.uuid(), type: 'test' },
    }, (error, response) => {
      assert.equal('false', response.content);
      assert.isString(response.content);
      done();
    });
  });

  it('Correct POST', (done) => {
    HTTP.post(url, {
      data: { secret: process.env.VK_TOKEN, type: 'test' },
    }, (error, response) => {
      assert.equal('ok', response.content);
      assert.isString(response.content);
      done();
    });
  });

  it('Non-existent method', (done) => {
    HTTP.post(url, {
      data: { secret: process.env.VK_TOKEN, type: faker.random.uuid() },
    }, (error, response) => {
      assert.equal('false', response.content);
      assert.isString(response.content);
      done();
    });
  });
});
