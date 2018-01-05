const express = require('express')
const bodyParser = require('body-parser')

const SeatModel = require('./models/seat-model')
const UserModel = require('./models/user-model')
const SeatService = require('./services/seats')
require('./database-connection')

const app = express()

app.use(bodyParser.json())

app.get('/seats', async (req, res) => {
  const seats = await SeatModel.find()
  res.send(seats)
})

app.get('/users', async (req, res) => {
  const users = await UserModel.find()
  res.send(users)
})

app.post('/seats/:id/book', async (req, res, next) => {
  const userId = req.body.userId
  const seatId = req.params.id
  try {
    const bookingResult = await SeatService.book(seatId, userId)
    res.status(bookingResult.status).send(bookingResult.result)
  } catch (err) {
    next(err)
  }
})

app.post('/seats/:id/reserve', async (req, res, next) => {
  const userId = req.body.userId
  const seatId = req.params.id
  try {
    const reservationResult = await SeatService.reserve(seatId, userId)
    res.status(reservationResult.status).send(reservationResult.result)
  } catch (err) {
    next(err)
  }
})

module.exports = app
