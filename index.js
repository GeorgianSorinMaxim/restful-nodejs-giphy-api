'use strict'

const express = require('express'),
    morgan = require('morgan'),
    port = process.env.PORT || 3000,
    requirejs = require('requirejs'),
    bodyParser = require('body-parser'),
    app = express()

// Log every request to the console
app.use(morgan('dev'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use('/routes', express.static(__dirname + '/routes'))

require('./routes/routes.js')(app)

app.listen(port, function () {
  console.log(`Listening on port ${process.env.PORT}`)
})
