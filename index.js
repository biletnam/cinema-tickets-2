const express = require('express')

const app = express()

app.set('view engine', 'pug')

app.listen(3000, () => {
  console.log('Server listening.')
})

app.get('/', (req, res, next) => {
  res.render('index')
})