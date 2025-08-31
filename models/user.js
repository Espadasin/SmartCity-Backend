const db = require('../config/db.js');

const user = db.sequelize.define('user', {
    id: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nickname: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
});

module.exports = user;