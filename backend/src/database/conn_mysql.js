require('dotenv/config');

const Sequelize =  require('sequelize')
const sequelize = new Sequelize(process.env.NAME_DB, process.env.USER_DB, process.env.PASS_DB, {
  host: process.env.HOST_DB,
  dialect: 'mysql',
  port: process.env.PORT_DB,
  logging: false
})

global.keyApi = process.env.API_KEY
module.exports = { sequelize }