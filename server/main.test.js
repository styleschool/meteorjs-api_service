import '/server/main';
import faker from 'faker';
import { Accounts } from 'meteor/accounts-base';
import { assert } from 'chai';

process.env.TOKEN = faker.random.uuid();

describe('Authentication Server:', () => {
    describe('Authorization:', () => {
        const user = {
            password: faker.internet.password(),
            email: faker.internet.email(),
        };

        before(() => {
            Accounts.createUser(user);
        });

        it('Invalid request', (done) => {
            Meteor.call('authorization', {
                email: user.email,
                password: user.password,
                token: faker.random.uuid(),
            }, (error, result) => {
                assert.isFalse(result);
                done();
            });
        });

        it('Invalid user', (done) => {
            Meteor.call('authorization', {
                email: faker.internet.email(),
                password: faker.internet.password(),
                token: faker.random.uuid(),
            }, (error, result) => {
                assert.isFalse(result);
                done();
            });
        });

        it('Valid user', (done) => {
            Meteor.call('authorization', {
                email: user.email,
                password: user.password,
                token: process.env.TOKEN,
            }, (error, result) => {
                assert.isTrue(result);
                done();
            });
        });
    });
});