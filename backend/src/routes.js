const express = require('express')
const routes = express.Router()
const axios = require('axios')


// post
//routes.post('/atualizarusuario', Pessoas.AtualizarPessoa )

routes.get('/teste', async (req, res) => {  
  //https://api.openweathermap.org/data/2.5/weather?q=London&appid=9b12c926e2e3d6b81482cf88efc3f15a
  try{
    let response = await axios.get('https://api.openweathermap.org/data/2.5/weather?q=London&appid=9b12c926e2e3d6b81482cf88efc3f15a')
    console.log(await response.data)
    res.send(await response.data)
  }catch(err){
    res.status(400).send(err)
  }
})

//Exporta uma váriavel de um arquivo
module.exports = routes;