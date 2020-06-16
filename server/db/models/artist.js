const Sequelize = require("sequelize");
const db = require("../db");

module.export = db.define("artist", {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
});
