const mongoose = require('mongoose')

const SeatModel = require('./models/seat-model')
const UserModel = require('./models/user-model')
require('./database-connection')

const seedSeats = async () => {
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

  for (let seat of seats) {
    await SeatModel.create(seat)
  }
}

const seedUsers = async () => {
  const users = [
    {fullName: 'John Smith', funds: 300},
    {fullName: 'Max Mustermann', funds: 300}
  ]

  for (let user of users) {
    await UserModel.create(user)
  }
}

const seed = async () => {
  await seedSeats()
  await seedUsers()
}

mongoose.connection.on('connected', async () => {
  console.log('Dropping database')
  await mongoose.connection.db.dropDatabase()
  console.log('Seeding')
  await seed()
  console.log('Finished')
  process.exit()
})
