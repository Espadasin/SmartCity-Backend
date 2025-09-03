const db = require('../config/db.js');


const chat = db.sequelize.define('chat', {
    title : {
        type: db.Sequelize.TEXT,
        require: true
    },
    commentary : {
        type: db.Sequelize.TEXT,
        require: true
    },
    municipality : {
        type: db.Sequelize.STRING,
        require: true
    },
    date : {
        type: db.Sequelize.DATEONLY,
        defaultValue: db.Sequelize.NOW
    }
});


module.exports = chat;