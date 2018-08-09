/* eslint-env mocha */
import faker from 'faker';

import { Meteor } from 'meteor/meteor';
import { assert } from 'chai';

process.env.VK_CONFKEY = faker.random.uuid();

describe('Methods VK:', () => {
  it('Debug', (done) => {
    Meteor.call('vk:test', (error, result) => {
      assert.equal(result, 'ok');
      assert.isString(result);
      done();
    });
  });

  it('Confirmation', (done) => {
    Meteor.call('vk:confirmation', (error, result) => {
      assert.equal(process.env.VK_CONFKEY, result);
      assert.isString(result);
      done();
    });
  });

  it('New Lead');
});
