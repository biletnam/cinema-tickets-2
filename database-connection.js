const mongoose = require('mongoose')

mongoose.Promise = global.Promise

const hostname = 'localhost'
const database = 'cinema'

mongoose.connect(`mongodb://${hostname}/${database}`)
