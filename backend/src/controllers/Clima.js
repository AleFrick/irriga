const axios = require('axios')
const modelCities = require('../models/Cities')

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
      attributes: ['name']
    })
    let climaCitie = []
    for(let i = 0; i<Cities.length;i++){
      let response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${Cities[i].name}&appid=9b12c926e2e3d6b81482cf88efc3f15a`)     
      
      climaCitie.push({        
          name: Cities[i].name,          
          dados: response.data.main        
      })
    }
    res.send(climaCitie)
    
  }catch(err){
    res.status(400).send(err)
  }
}
/*
Informações que devem ser salvas no banco: data e hora do download (em UTC) da cidade,
temperatura, temperatura máxima, temperatura mínima, velocidade do vento, horário local do
nascer e pôr do sol e quantidade de chuva na última hora;
- As informações de temperatura devem ser salvas em Celsius e a velocidade do vento em m/s;
- A tabela para salvar os dados climáticos das cidades deve ser criada e enviada com o script de
criação;
- A rotina deve ser executada automaticamente todos dias e a cada hora no minuto 30;
- Deve ser possível executar manualmente (via terminal) a rotina para todas as cidades ou então
fornecer o id específico de uma cidade;
*/
teste = () => {
  setInterval(() => {
    console.log('alex')
  }, 1000);
}


module.exports = { getClima, getClimaCidadeDb }