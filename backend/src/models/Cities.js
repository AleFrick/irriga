const Sequelize = require('sequelize')
var moment = require('moment');
const conn = require('../database/conn_mysql')

const Cities = conn.sequelize.define('cities', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },  
    name: {
      type: Sequelize.STRING,
      allowNull: false,      
    },
    latitude: {
      type: Sequelize.DOUBLE,      
    },
    longitude: {      
      type: Sequelize.DOUBLE,
      
    },
    gmt: {
      type: Sequelize.INTEGER,
      allowNull: false,      
    }
  }, {  
    tableName: 'cities',
    timestamps: false,
  })

  Cities.sync({force: false, alter: false}).then(() => {
    console.log('Table Cities loaded successfuly');
  });
  
  module.exports = Cities;

