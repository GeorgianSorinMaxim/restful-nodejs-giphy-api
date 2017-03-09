const assert = require('assert')
const should = require('should')
const supertest = require('supertest')

const server = supertest.agent('http://localhost:3000')

describe('Unit test for the giphinate app', function () {

  it ('should test giphinate', function (done) {
    server
    .get('/hello-world')
    .expect('Content-type',/json/)
    .expect(200)
    .end(function (err,res) {
      res.status.should.equal(200)
      done()
    })
  })

  it ('should return the gif - if any gif is existent', function (done) {
    server
    .get('/gif/newGif')
    .expect('Content-type', /json/)
    .expect(200)
    .end(function (err, res) {
      res.status.should.equal(200)
      done()
    })
  })

  it ('should delete an existent gif', function (done) {
    server
    .del('/newGif')
    .expect('Content-type', /json/)
    .expect(200)
    .end(function (err,res) {
      res.status.should.equal(200)
      done()
    })
  })

  it ('should insert a gif - if not already inserted', function (done) {
    server
    .post('/newGif')
    .expect('Content-type', /json/)
    .expect(200)
    .end(function (err,res) {
      res.status.should.equal(200)
      done()
    })
  })
})
