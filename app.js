const express = require('express')
const bodyParser = require('body-parser')

const SeatModel = require('./models/seat-model')
const UserModel = require('./models/user-model')
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
    const seat = await SeatModel.findById(seatId)
    seat.set({'status': 'booked', 'owner': userId})
    const result = await seat.save()
    res.send(result)
  } catch (err) {
    next(err)
  }
})

module.exports = app

// 5a4f7ce9a62db73aa917a9c3   5a4f7ceba62db73aa917a9cf
