const SeatModel = require('./models/seat-model')
const mongoose = require('mongoose')
require('./database-connection')

const seedSeats = () => {
  const seats = [
    {category: '1', row: 1, seat: 1},
    {category: '1', row: 1, seat: 2},
    {category: '1', row: 1, seat: 3},
    {category: '1', row: 2, seat: 1},
    {category: '1', row: 2, seat: 2},
    {category: '1', row: 2, seat: 3},
    {category: '2', row: 3, seat: 1},
    {category: '2', row: 3, seat: 2},
    {category: '2', row: 3, seat: 3},
    {category: '2', row: 4, seat: 1},
    {category: '2', row: 4, seat: 2},
    {category: '2', row: 4, seat: 3}
  ]

  seats.forEach((seat) => {
    const newSeat = new SeatModel(seat)
    newSeat.save()
  })
}

const seed = () => {
  seedSeats()
}

mongoose.connection.on('connected', () => {
  console.log('Dropping database')
  mongoose.connection.db.dropDatabase()
  console.log('Seeding')
  seed()
  console.log('Finished')
  process.exit()
})
