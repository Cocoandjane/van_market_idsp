const express = require('express')
const app = express()

app.use(express.static("static"))

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index')
  })

  module.exports = app;