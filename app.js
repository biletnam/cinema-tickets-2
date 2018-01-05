const express = require('express')
const bodyParser = require('body-parser')
const SeatModel = require('./models/seat-model')

require('./database-connection')

const app = express()

app.use(bodyParser.json())

app.get('/seats', async (req, res) => {
  const seats = await SeatModel.find()
  res.send(seats)
})

module.exports = app
