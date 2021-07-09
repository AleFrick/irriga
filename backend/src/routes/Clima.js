const express = require('express')
const routes = express.Router()
const ClimaController = require('../controllers/Clima')

routes.get('/getclima', ClimaController.getClima)
routes.get('/getclimadb', ClimaController.getClimaCidadeDb)


module.exports = routes;