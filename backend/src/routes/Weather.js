const express = require('express')
const routes = express.Router()
const WeatherControll = require('../controllers/Weather')

routes.get('/getclima', WeatherControll.getClima)
routes.get('/getclimadb', WeatherControll.getClimaCidadeDb)
routes.get('/monitorcity', WeatherControll.monitoringCity)

module.exports = routes
