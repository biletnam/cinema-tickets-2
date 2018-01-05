const mongoose = require('mongoose')

const SeatSchema = mongoose.Schema({
  category: {
    type: String,
    enum: ['1', '2'],
    required: true
  },
  row: {
    type: Number,
    required: true,
    min: 1
  },
  seat: {
    type: Number,
    required: true,
    min: 1
  }
})

module.exports = mongoose.model('Seat', SeatSchema)
