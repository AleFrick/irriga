const axios = require('axios')
const modelCities = require('../models/Cities')
const modelMonitorWeather = require('../models/MonitorWeather')
const { sequelize } = require('../database/conn_mysql')
const { Op } = require('sequelize')
const moment = require('moment')
const MonitorWeather = require('../models/MonitorWeather')

getClima = async (req, res) => {  
    
  try{
    let response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${req.query.cidade}&appid=9b12c926e2e3d6b81482cf88efc3f15a`)    
    res.send(await response.data)
  }catch(err){
    res.status(400).send(err)
  }
}

getClimaCidadeDb = async(req, res) => {   
  try{    
    let Cities = await modelCities.findAll({
      attributes: ['name', 'id']
    })
    let climaCitie = []
    for(let i = 0; i<Cities.length;i++){
      let response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${Cities[i].name}&appid=9b12c926e2e3d6b81482cf88efc3f15a`)     
      
      response.data.main.temp = (response.data.main.temp - 273.15).toFixed(0)
      response.data.main.temp_min = (response.data.main.temp_min - 273.15).toFixed(0)
      response.data.main.temp_max = (response.data.main.temp_max - 273.15).toFixed(0)
      response.data.main.feels_like = (response.data.main.feels_like - 273.15).toFixed(0)
      
      let sunrise = new Date(response.data.sys.sunrise* 1000) 
      let sunset = new Date(response.data.sys.sunset* 1000)       
      climaCitie.push({        
          name: Cities[i].name,          
          temp: response.data.main,
          wind_speed: response.data.wind.speed,
          sunrise: `${sunrise.getHours()}:${sunrise.getMinutes()}:${sunrise.getSeconds()}`,
          sunset: `${sunset.getHours()}:${sunset.getMinutes()}:${sunset.getSeconds()}`,
          rain: response.data.rain?response.data.rain['1h']:0
      })

      var t = await sequelize.transaction();
      try{
        let monitor = await modelMonitorWeather.create({
          id_citie: Cities[i].id,
          temp: response.data.main.temp,
          temp_min: response.data.main.temp_min || null,
          temp_max: response.data.main.temp_max || null,
          wind_speed: response.data.wind.speed || null,
          sunrise: `${sunrise.getHours()}:${sunrise.getMinutes()}:${sunrise.getSeconds()}` || null,
          sunset: `${sunset.getHours()}:${sunset.getMinutes()}:${sunset.getSeconds()}` || null,
          rain: response.data.rain?response.data.rain['1h']:null,
        }, {transaction: t})            
        t.commit()
      }catch(err){
        t.rollback()
        res.status(400).send(err)        
        return
      }
    }        
    res.send('ok')  
  }catch(err){    
    res.status(400).send(err)
  }
}

insertDadosMonitor = async () =>{
  try{    
    let Cities = await modelCities.findAll({
      attributes: ['name', 'id']
    })    
    for(let i = 0; i<Cities.length;i++){
      let response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${Cities[i].name}&appid=9b12c926e2e3d6b81482cf88efc3f15a`)     
      
      response.data.main.temp = (response.data.main.temp - 273.15).toFixed(0)
      response.data.main.temp_min = (response.data.main.temp_min - 273.15).toFixed(0)
      response.data.main.temp_max = (response.data.main.temp_max - 273.15).toFixed(0)
      response.data.main.feels_like = (response.data.main.feels_like - 273.15).toFixed(0)
      
      let sunrise = new Date(response.data.sys.sunrise* 1000) 
      let sunset = new Date(response.data.sys.sunset* 1000)       
      // sunrise: `${sunrise.getHours()}:${sunrise.getMinutes()}:${sunrise.getSeconds()}`,
      // sunset: `${sunset.getHours()}:${sunset.getMinutes()}:${sunset.getSeconds()}`,      
      if(Cities[i].id){
        var t = await sequelize.transaction();
        try{        
          let monitor = await modelMonitorWeather.create({
            id_citie: Cities[i].id,
            temp: response.data.main.temp,
            temp_min: response.data.main.temp_min || null,
            temp_max: response.data.main.temp_max || null,
            wind_speed: response.data.wind.speed || null,
            sunrise: sunrise || null,
            sunset: sunset || null,
            rain: response.data.rain?response.data.rain['1h']:null,
          }, {transaction: t})            
          t.commit()
        }catch(err){
          t.rollback()        
          return err
        }
      }
    }            
  }catch(err){    
    return err
  }
}

teste =  async () => {  
  setInterval( async () => {
    console.log('\n Iniciando Monitoramento') 
    await insertDadosMonitor()
    console.log('\n Fim monitoramento')
  },
   //1800000  30 minutos
   60000
  );  
}

getQuantidade = async (req, res) => {  
  try{
    let monitor = await MonitorWeather.findAll({
      where: {
        dt_created: {
          [Op.between]: [moment().format('yyyy-MM-DD'), moment().format('yyyy-MM-DD')]
        }
      }
    })   
    let Cities = await modelCities.findAll()       
    if(monitor.length<(1000-Cities.length)){
      res.status(200).send('pode continuar')
    }else{
      res.status(200).send('para')
    }
    
  }catch(err){
    res.status(400).send(err)
  }
}

// teste()

module.exports = { getClima, getClimaCidadeDb, getQuantidade }