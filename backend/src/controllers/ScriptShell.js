const axios = require('axios')
const { sequelize } = require('../database/conn_mysql')
const modelCities = require('../models/Cities')
const modelMonitorWeather = require('../models/MonitorWeather')

const updateCity = async (param) => {
  if(!param){
    console.log('\nInforme o dado')
    return
  }  
  var Cities = await modelCities.findOne({
    where: {
      name: param
    }
  })  
  if(!Cities){    
    Cities = await modelCities.findOne({
      where: {
        id: param
      }
    })
    
  }
  
  if(!Cities){
    console.log('\nCidade não foi localizada na base de dados.')
    return 
  }

  response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${Cities.name.trim()}&appid=9b12c926e2e3d6b81482cf88efc3f15a`)            
  if(response.cod){
    console.log(response.message)
    return
  }
  let sunrise = new Date(response.data.sys.sunrise* 1000) 
  let sunset = new Date(response.data.sys.sunset* 1000)       
  var t = await sequelize.transaction();
  response.data.main.temp = (response.data.main.temp - 273.15).toFixed(0)
  response.data.main.temp_min = (response.data.main.temp_min - 273.15).toFixed(0)
  response.data.main.temp_max = (response.data.main.temp_max - 273.15).toFixed(0)
  response.data.main.feels_like = (response.data.main.feels_like - 273.15).toFixed(0)
  try{
    let monitor = await modelMonitorWeather.create({
      id_citie: Cities.id,
      temp: response.data.main.temp,
      temp_min: response.data.main.temp_min || null,
      temp_max: response.data.main.temp_max || null,
      wind_speed: response.data.wind.speed || null,
      sunrise: `${sunrise.getHours()}:${sunrise.getMinutes()}:${sunrise.getSeconds()}` || null,
      sunset: `${sunset.getHours()}:${sunset.getMinutes()}:${sunset.getSeconds()}` || null,
      rain: response.data.rain?response.data.rain['1h']:null,
    }, {transaction: t})            
    t.commit()
    console.log(`\n Dados atualizados da cidade de ${Cities.name}`)
    console.log({
      id_citie: Cities.id,
      temp: response.data.main.temp,
      temp_min: response.data.main.temp_min || null,
      temp_max: response.data.main.temp_max || null,
      wind_speed: response.data.wind.speed || null,
      sunrise: `${sunrise.getHours()}:${sunrise.getMinutes()}:${sunrise.getSeconds()}` || null,
      sunset: `${sunset.getHours()}:${sunset.getMinutes()}:${sunset.getSeconds()}` || null,
      rain: response.data.rain?response.data.rain['1h']:'',
    })
    console.log('\n')
    console.log('Informações anteriores salvas em banco')
  }catch(err){
    t.rollback()
    console.log(err)        
    return
  }
}

updateCity(process.argv[2]);