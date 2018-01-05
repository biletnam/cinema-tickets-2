const test = require('ava')
const request = require('supertest')
const mongoose = require('mongoose')

const app = require('../app')
const SeatModel = require('../models/seat-model')

test.beforeEach(async t => {
  await mongoose.connection.on('connected', () => {
    mongoose.connection.db.dropDatabase()
  })
})

test('GET /seats', async t => {
  await SeatModel.create({category: '1', row: 1, seat: 1})
  await SeatModel.create({category: '2', row: 2, seat: 2})

  const res = await request(app)
    .get('/seats')

  t.is(res.status, 200)
  t.true(Array.isArray(res.body), 'Body should be an array')
  t.true(res.body.length === 2)
})
