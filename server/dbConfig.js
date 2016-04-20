import mongoose from 'mongoose'
import config from '../config'
import _debug from 'debug'

const debug = _debug('app:dbConfig')

export default function dbConfig () {
  const dbURL = config.mongo_url + ' DB!'

  mongoose.connect(config.mongo_url, function () {
    debug('  --> Connected to ' + dbURL)
  })
  mongoose.connection.on('error', function (err) {
    debug(err)
  })

  if (config.env !== 'production') {
    mongoose.connection.on('disconnected', function () {
      debug('  --> Disconnected from ' + dbURL)
    })
  }

  process.on('SIGINT', function () {
    mongoose.connection.close(function () {
      debug('  --> Disconnected from ' + config.mongo_url + ' through app termination')
      process.exit(0)
    })
  })
}
