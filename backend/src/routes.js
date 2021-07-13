const express = require('express')
const routes = express.Router()
const routeWeather = require('./routes/Weather')

routes.use(routeWeather)

module.exports = routes
