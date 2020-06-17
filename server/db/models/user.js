const crypto = require('crypto');
const Sequelize = require('sequelize');
const db = require('../db');
const Order = require('./order');

const User = db.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
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
    mailingAddress: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    billingAddress: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    isAdmin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
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
   await user.createCart({isCart: true, userId: user.id});
});

User.afterCreate(async (user) => {
    await user.createCart({isCart: true, userId: user.id});
 });
