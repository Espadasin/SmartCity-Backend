const db = require('../config/db.js');

const location = db.sequelize.define('location', {
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
    },
    type: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    solved: {
        type: db.Sequelize.BOOLEAN,
        defaultValue: false
    }
});

module.exports = location;