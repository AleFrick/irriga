const axios = require('axios')
const { sequelize } = require('../database/conn_mysql')
const modelCities = require('../models/Cities')
const modelMonitorWeather = require('../models/MonitorWeather')

const updateCity = async (param) => {
  if (!param) {
    console.log('\nInforme o dado')
    return
  }
  let Cities = await modelCities.findOne({
    where: {
      name: param
    }
  })
  if (!Cities) {
    Cities = await modelCities.findOne({
      where: {
        id: param
      }
    })
  }
  if (!Cities) {
    console.log('\nCidade não foi localizada na base de dados.')
    return
  }

  const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${Cities.name.trim()}&appid=9b12c926e2e3d6b81482cf88efc3f15a`)
  if (response.cod) {
    console.log(response.message)
    return
  }
  const t = await sequelize.transaction()
  try {
    const json = {
      id_citie: Cities.id,
      temp: (response.data.main.temp - 273.15).toFixed(0) || null,
      temp_min: (response.data.main.temp_min - 273.15).toFixed(0) || null,
      temp_max: (response.data.main.temp_max - 273.15).toFixed(0) || null,
      wind_speed: (response.data.main.feels_like - 273.15).toFixed(0) || null,
      sunrise: `${(new Date(response.data.sys.sunrise * 1000)).getHours()}:${(new Date(response.data.sys.sunrise * 1000)).getMinutes()}:${(new Date(response.data.sys.sunrise * 1000)).getSeconds()}` || null,
      sunset: `${(new Date(response.data.sys.sunset * 1000)).getHours()}:${(new Date(response.data.sys.sunset * 1000)).getMinutes()}:${(new Date(response.data.sys.sunset * 1000)).getSeconds()}` || null,
      rain: response.data.rain ? response.data.rain['1h'] : ''
    }
    await modelMonitorWeather.create({ json }, { transaction: t })
    t.commit()
    console.log(`\n Dados atualizados da cidade de ${Cities.name}`)
    console.log({
      json
    })
    console.log('\n')
    console.log('Informações anteriores salvas em banco')
  } catch (err) {
    t.rollback()
    console.log(err)
  }
}

updateCity(process.argv[2])
