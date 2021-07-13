const Sequelize = require('sequelize')
const moment = require('moment')
const conn = require('../database/conn_mysql')

const MonitorWeather = conn.sequelize.define('c', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_citie: {
    type: Sequelize.STRING
  },
  temp: {
    type: Sequelize.DOUBLE
  },
  temp_min: {
    type: Sequelize.DOUBLE
  },
  temp_max: {
    type: Sequelize.DOUBLE
  },
  wind_speed: {
    type: Sequelize.DOUBLE
  },
  sunrise: {
    type: Sequelize.TIME
  },
  sunset: {
    type: Sequelize.TIME
  },
  rain: {
    type: Sequelize.DOUBLE
  },
  hr_altered: {
    type: Sequelize.TIME
  },
  dt_altered: {
    type: Sequelize.DATEONLY,
    get: function () {
      return moment(this.getDataValue('DateTime')).format('DD/MM/YYYY')
    }
  },
  dt_created: {
    type: Sequelize.DATEONLY,
    get: function () {
      return moment(this.getDataValue('DateTime')).format('DD/MM/YYYY')
    }
  }
}, {
  tableName: 'monitor_weather',
  timestamps: false
})

MonitorWeather.beforeCreate(async (MonitorWeather) => {
  MonitorWeather.dt_created = moment().format('YYYY-MM-DD')
  MonitorWeather.dt_altered = moment().format('YYYY-MM-DD')
  MonitorWeather.hr_altered = moment().format('HH:mm')
})
MonitorWeather.beforeUpdate(async (MonitorWeather) => {
  MonitorWeather.dt_altered = moment().format('YYYY-MM-DD')
  MonitorWeather.hr_altered = moment().format('HH:mm')
})

MonitorWeather.sync({ force: false, alter: true }).then(() => {
  // console.log('Table MonitorWeather loaded successfuly');
})

module.exports = MonitorWeather
