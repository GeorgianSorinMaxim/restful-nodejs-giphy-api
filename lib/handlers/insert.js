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
  let gifUrl = ''
  const results = []
  const text = req.params.queryText

  // SQL Insert
  pg.connect(process.env.DATABASE_URL, (err, client, done) => {
    if (err) {
      done()
      return res.status(500).json({success: false, data: err})
    }

    giphy.search(text, function (errGiphy, resGiphy) {
   	  if (resGiphy.data.length > 0) {
        gifUrl = resGiphy.data[0].url
      }

      if (gifUrl) {
        let found = false
        const select = client.query('SELECT * FROM giphys WHERE query=($1)', [text])

        select.on('row', (row) => {
          found = true
        })

        select.on('end', () => {
          if (found) {
            done()
            return res.status(500).json({success: false, data: 'Already inserted!'})
          } else {
            client.query('INSERT into giphys (query, url, created_at) VALUES($1, $2, $3)',
            [text, gifUrl, new Date()])

            const query = client.query('SELECT * FROM giphys ORDER BY giphy_id DESC')

            query.on('row', (row) => {
              results.push(row)
            })

            query.on('end', () => {
              done()
              return res.json(results)
            })
          }
        })
      } else {
        return res.status(500).json({success: false, data: errGiphy})
      }
    })
  })
}
