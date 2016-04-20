import mongoose from 'mongoose'
import config from '../config'
import Channel from '../server/models/channels'
import _debug from 'debug'

const debug = _debug('app:seed')
debug('Starting to seed the development db.')
mongoose.connect(config.mongo_url)
.then(() => mongoose.connection.db.dropCollection('channels'))
.then(() => Channel.create([
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
]))
.then(() => mongoose.connection.close())
.then(() => debug('Seeding successfully completed.'))
.catch((err) => debug(err))
