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
  },
  status: {
    type: String,
    enum: ['free', 'booked'],
    required: true,
    default: 'free'
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  reservedAt: {
    type: Date
  }
}, {
  toJSON: {
    transform: (doc, ret) => {
      if (ret.status === 'booked') {
        return
      }
      if (!ret.reservedAt) {
        return
      }
      const reservationExpired = (Date.now() - ret.reservedAt) / 1000 > 180
      if (!reservationExpired) {
        ret.status = 'reserved'
        return ret
      }
    }
  }
})

SeatSchema.methods.reservationExpired = function () {
  if (!this.reservedAt) {
    return true
  }
  return (Date.now() - this.reservedAt) / 1000 > 180
}

module.exports = mongoose.model('Seat', SeatSchema)
