import 'babel-polyfill'
import { expect } from 'chai'
import request from 'supertest'
import app from '../../bin/server'
import mongoose from 'mongoose'
import Channel from '../models/channels'

describe('Catalogue Service', () => {
  before((done) => {
    const channels = [
      {
        category: 'News',
        product: 'Sky News'
      },
      {
        category: 'News',
        product: 'Sky Sport News'
      },
      {
        category: 'Sports',
        product: 'Arsenal TV',
        locationID: 'LONDON'
      },
      {
        category: 'Sports',
        product: 'Chelsea TV',
        locationID: 'LONDON'
      },
      {
        category: 'Sports',
        product: 'Liverpool TV',
        locationID: 'LIVERPOOL'
      }
    ]
    Channel.create(channels).then(() => done())
  })

  it('GET /api/catalogue-service should return 200', (done) => {
    request(app)
    .get('/api/catalogue-service')
    .expect('Content-Type', /json/)
    .expect(200, done)
  })

  it('should always return channels not dependent on locationID', (done) => {
    request(app)
    .get('/api/catalogue-service')
    .query({'locationID': 'LONDON'})
    .end((err, res) => {
      if (err) return done(err)
      const { channels } = res.body.data
      const news = channels.filter((elem) => elem.category === 'News')
      expect(news).to.have.lengthOf(2)
      expect(news).to.include({category: 'News', product: 'Sky News'})
      expect(news).to.include({category: 'News', product: 'Sky Sport News'})
      done()
    })
  })

  it('should not return channels with a location value different from locationID', (done) => {
    request(app)
    .get('/api/catalogue-service')
    .query({'locationID': 'LONDON'})
    .end((err, res) => {
      if (err) return done(err)
      const { channels } = res.body.data
      const sports = channels.filter((elem) => elem.category === 'Sports')
      expect(sports).to.have.lengthOf(2)
      expect(sports).to.include({category: 'Sports', product: 'Arsenal TV'})
      expect(sports).to.include({category: 'Sports', product: 'Chelsea TV'})
      expect(sports).not.to.include({category: 'Sports', product: 'Liverpool TV'})
      done()
    })
  })

  after((done) => {
    mongoose.connection.db.dropCollection('channels', (err) => {
      if (err) console.log(err)
      app.close()
      done()
    })
  })
})
