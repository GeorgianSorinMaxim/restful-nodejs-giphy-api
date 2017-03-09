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
  const results = []
  const text = req.params.queryText

  // SQL Delete
  pg.connect(process.env.DATABASE_URL, function (errQuery, client, done) {
    let found = false
    const select = client.query('SELECT * FROM giphys WHERE query=($1)', [text])

    select.on('row', (row) => {
      console.log(row)
      found = true
    })

    select.on('end', () => {
      if (found) {
        client.query('DELETE FROM giphys WHERE query=($1)', [text])

        const query = client.query('SELECT * FROM giphys ORDER BY query ASC')

        query.on('row', (row) => {
          results.push(row)
        })

        query.on('end', () => {
          done()
          return res.json(results)
        })
      } else {
        return res.status(500).json({success: false, data: 'No gif found for deletion!'})
      }
    })
  })
}
