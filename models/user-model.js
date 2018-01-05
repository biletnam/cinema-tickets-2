const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
  fullName: {
    type: String,
    require: true
  },
  funds: {
    type: Number,
    min: 0
  }
})

module.exports = mongoose.model('User', UserSchema)
