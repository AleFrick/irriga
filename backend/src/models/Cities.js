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
      type: Sequelize.STRING
    },
    hr_altered:{
      type: Sequelize.TIME
    },
    dt_altered: {
      type: Sequelize.DATEONLY,    
      get: function() {
        return moment(this.getDataValue('DateTime')).format('DD/MM/YYYY')
      }
    },    
    dt_created: {
      type: Sequelize.DATEONLY,    
      get: function() {
        return moment(this.getDataValue('DateTime')).format('DD/MM/YYYY')
      } 
    }
  }, {  
    tableName: 'cities',
    timestamps: false,
  })

  Cities.beforeCreate(async(Cities) => {        
    Cities.dt_created = moment().format('YYYY-MM-DD')
    Cities.dt_altered = moment().format('YYYY-MM-DD')
    Cities.hr_altered = moment().format('HH:mm')
  })
  Cities.beforeUpdate(async(Cities) => {    
    Cities.dt_altered = moment().format('YYYY-MM-DD')
    Cities.hr_altered = moment().format('HH:mm')
  })

  Cities.sync({force: false, alter: true}).then(() => {
    console.log('Table Cities loaded successfuly');
  });
  
  module.exports = Cities;

