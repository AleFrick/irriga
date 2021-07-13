const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./routes')
const cors = require('cors')
const port = 4851

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(routes)

app.listen(port, () => {
  console.log(`\n Servidor rodando na porta ${port} `)
})
