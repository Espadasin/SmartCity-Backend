const { Sequelize } = require('sequelize')

require('dotenv').config()

const sequelize = new Sequelize(process.env.DB_URL, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,  
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