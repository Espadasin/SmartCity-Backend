const db = require('../config/db.js');

const location = db.sequelize.define('location', {
    id: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    commentary: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    latitude: {
        type: db.Sequelize.FLOAT,
        allowNull: false
    },
    longitude: {
        type: db.Sequelize.FLOAT,
        allowNull: false
    }
});

module.exports = location;