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

// add to seed.js
const artists = [
    {
        name: "ANJEL - Boris Anje Tabufor",
    },
    { name: "Benny Bing" },
    {
        name: "Claudia Saimbert",
    },
    {
        name: "David Thuku",
    },
    {
        name: "Deana Lawson",
    },
    {
        name: "Micaiah Carter",
    },
    {
        name: "Mickalene Thomas",
    },
];
