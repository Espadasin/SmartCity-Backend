const { Sequelize } = require('sequelize')

require('dotenv').config()

const sequelize = new Sequelize(process.env.MYSQLDATABASEURL, {
    host: process.env.MYSQLHOST,
    port: process.env.MYSQLPORT,
    dialect: 'mysql',
})

async function connectToDB(){
  try {
    await sequelize.authenticate();
    console.log('Connection to MySQL has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

connectToDB();

module.exports = {
    Sequelize : Sequelize,
    sequelize : sequelize
}