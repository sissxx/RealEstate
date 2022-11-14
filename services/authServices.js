const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { secret, options } = require('../constants');

exports.create = (userData) => User.create(userData);


exports.login = async (username, password) => {
    const user = await User.findOne({ username });

    if (!user) {
        throw {
            message: 'Can not find this user or password!'
        }
    }
    const isValid = bcrypt.compare(password, user.password);

    if (!isValid) {
        throw {
            message: 'Not valid password!'
        }
    }

    return user;
};

exports.createToken = (user) => {
    const payload = { _id: user._id, username: user.username, address: user.address };

    const promiseResult = new Promise((resolve, reject) => {
        jwt.sign(payload, secret, options, (err, decodedToken) => {
            if (err) {
                return reject(err);
            }

            resolve(decodedToken);
        });
    });
    return promiseResult;
}