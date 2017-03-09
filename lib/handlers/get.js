'use strict'

const schemas = require('../schemas')({
  DATABASE_URL: process.env.DATABASE_URL
})

const pg = require('pg')
const giphy = require('giphy-api')()

const client = new pg.Client()

/**
 * @params req.params.queryText {String} Text to query giphy for
 */
module.exports = function (req, res) {
	let gifUrl = null
  const text = req.params.queryText.toString()

  // SQL Select WHERE
  pg.connect(process.env.DATABASE_URL, function (errQuery, client, done) {
    const query = client.query('SELECT * FROM giphys WHERE query=($1)', [text])

    query.on('row', (row) => {
      gifUrl = row.url
    })

    query.on('end', () => {
      if (!gifUrl) {
        return res.status(500).json({success: false, data: 'No gif found!'})
      } else {
        done()
        return res.json(gifUrl)
      }
    })
  })
}
