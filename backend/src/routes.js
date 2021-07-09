const express = require('express')
const routes = express.Router()
const rotaClima = require('../src/routes/Clima')
const modelCities = require('../src/models/Cities')


routes.use(rotaClima)

module.exports = routes;