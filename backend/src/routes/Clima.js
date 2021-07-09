const express = require('express')
const routes = express.Router()
const ClimaController = require('../controllers/Clima')

routes.get('/getclima', ClimaController.getClima)


module.exports = routes;