import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';

Meteor.methods({
    'authorization': function (options) {
        /* Checks the token */
        if (!('token' in options) || !(process.env.TOKEN === options.token)) {
            return false;
        }

        /* Checks username and password */
        if (!('username' in options) || !('password' in options)) {
            return false;
        }

        const user = Meteor.users.findOne({
            username: options.username
        });

        /* Verifies the user */
        if (user && Accounts._checkPassword(user, options.password)) {
            return true;
        }

        return false;
    }
});