const axios = require('axios')

getClima = async (req, res) => {  
    
  try{
    let response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${req.query.cidade}&appid=9b12c926e2e3d6b81482cf88efc3f15a`)    
    res.send(await response.data)
  }catch(err){
    res.status(400).send(err)
  }
}

module.exports = { getClima }