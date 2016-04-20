import 'babel-polyfill'
import { expect } from 'chai'
import request from 'supertest'
import app from '../../bin/server'

describe('Customer Location Service', () => {
  it('GET /api/customer-location-service should return 200', (done) => {
    request(app)
    .get('/api/customer-location-service')
    .set('Cookie', 'customerID=123456')
    .expect('Content-Type', /json/)
    .expect(200, done)
  })

  it('should return a locationID if customerID is valid', (done) => {
    request(app)
    .get('/api/customer-location-service')
    .set('Cookie', 'customerID=123456')
    .end((err, res) => {
      if (err) return done(err)
      const { locationID } = res.body.data
      expect(locationID).to.exist
      expect(locationID).to.be.a('string')
      done()
    })
  })

  it('should return an error if no Cookie is set', (done) => {
    request(app)
    .get('/api/customer-location-service')
    .expect('Content-Type', /json/)
    .expect(400)
    .end((err, res) => {
      if (err) return done(err)
      const { error } = res.body
      expect(error).to.exist
      expect(error).to.be.a('string')
      done()
    })
  })
})
