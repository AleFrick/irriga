const express = require('express')
const routes = express.Router()
const routeWeather = require('./routes/Weather')
const modelCities = require('../src/models/Cities')


routes.use(routeWeather)

module.exports = routes;