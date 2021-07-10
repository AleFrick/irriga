const axios = require('axios')

teste = async () => {
  let response = await axios.get(`http://localhost:4851/quantidade`)     
  return response
}


console.log(teste())