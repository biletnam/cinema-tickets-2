const SeatModel = require('../models/seat-model')
const UserModel = require('../models/user-model')

const PRICE_MAPPING = {'1': 300, '2': 200}

const book = async (seatId, userId) => {
  const user = await UserModel.findById(userId)
  const seat = await SeatModel.findById(seatId)
  const price = PRICE_MAPPING[seat.category]
  const newFunds = user.funds - price
  if (newFunds < 0) {
    return {status: 412, result: 'You don\'t have enough money'}
  }
  if (seat.status !== 'reserved' && seat.owner.id !== user.id) {
    return {status: 412, result: 'This seat is unavailable for booking'}
  }
  user.set({'funds': newFunds})
  await user.save()
  seat.set({'status': 'booked'})
  const result = await seat.save()
  return {status: 200, result: result}
}

const reserve = async (seatId, userId) => {
  const user = await UserModel.findById(userId)
  const seat = await SeatModel.findById(seatId)
  if (seat.status !== 'free') {
    return {status: 412, result: 'This seat is unavailable for booking'}
  }
  seat.set({'status': 'reserved', 'owner': user})
  const result = await seat.save()
  return {status: 200, result: result}
}

module.exports = {
  book,
  reserve
}
