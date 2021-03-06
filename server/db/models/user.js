const crypto = require('crypto');
const Sequelize = require('sequelize');
const db = require('../db');
const Cart = require('./cart');

const User = db.define('user', {
    name: {
        type: Sequelize.STRING,
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isEmail: true,
            notEmpty: true,
        },
    },
    password: {
        type: Sequelize.STRING,
        validate: {
            notEmpty: true,
            len: [8, 64],
        },
        get() {
            return () => this.getDataValue('password');
        },
    },
    isAdmin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },
    salt: {
        type: Sequelize.STRING,
        get() {
            return () => this.getDataValue('salt');
        },
    },
    googleId: {
        type: Sequelize.STRING,
    },
});

module.exports = User;

User.prototype.correctPassword = function (candidatePwd) {
    return User.encryptPassword(candidatePwd, this.salt()) === this.password();
};

User.generateSalt = function () {
    return crypto.randomBytes(16).toString('base64');
};

User.encryptPassword = function (plainText, salt) {
    return crypto
        .createHash('RSA-SHA256')
        .update(plainText)
        .update(salt)
        .digest('hex');
};

const setSaltAndPassword = (user) => {
    if (user.changed('password')) {
        user.salt = User.generateSalt();
        user.password = User.encryptPassword(user.password(), user.salt());
    }
};

User.beforeCreate(setSaltAndPassword);
User.beforeUpdate(setSaltAndPassword);
User.beforeBulkCreate((users) => {
    users.forEach(setSaltAndPassword);
});

User.afterCreate(async (user) => {
    await user.createCart();
});
