const test = require('ava')
const request = require('supertest')
// const mongoose = require('mongoose')

const app = require('../app')
const SeatModel = require('../models/seat-model')
const UserModel = require('../models/user-model')

test('GET /seats', async t => {
  await SeatModel.create({category: '1', row: 1, seat: 1})
  await SeatModel.create({category: '2', row: 2, seat: 2})

  const res = await request(app)
    .get('/seats')

  t.is(res.status, 200)
  t.true(Array.isArray(res.body), 'Body should be an array')
  t.true(res.body.length > 1)
})

test('Get /users', async t => {
  await UserModel.create({fullName: 'John Smith', funds: 300})
  await UserModel.create({fullName: 'Barbara Johnson', funds: 300})

  const res = await request(app)
    .get('/users')

  t.is(res.status, 200)
  t.true(Array.isArray(res.body), 'Body should be an array')
  t.true(res.body.length > 1)
})

test('POST /seats/:id/book successful', async t => {
  const seat = await SeatModel.create({category: '1', row: 1, seat: 1})
  const user = await UserModel.create({fullName: 'John Smith', funds: 300})

  const res = await request(app)
    .post(`/seats/${seat.id}/book`)
    .send({userId: user.id})

  t.is(res.status, 200)
  t.true(res.body.status === 'booked', 'Status should be "Booked"')
})

test('POST /seats/:id/book unsuccessful', async t => {
  const seat = await SeatModel.create({category: '1', row: 1, seat: 1})
  const user = await UserModel.create({fullName: 'John Smith', funds: 50})

  const res = await request(app)
    .post(`/seats/${seat.id}/book`)
    .send({userId: user.id})

  t.is(res.status, 412)
})
