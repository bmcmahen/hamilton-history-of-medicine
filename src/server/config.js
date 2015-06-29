import Confidence from 'confidence'
import pkg from '../../package.json'
import GoodLoggly from 'good-loggly'
import GoodConsole from 'good-console'

const master = Object.freeze({
  version: pkg.version,
  http: {
    host: 'localhost',
    port: 8000
  },

  logger: {
    $filter: 'env',
    production: [{
      reporter: GoodLoggly,
      events: { log: '*', request: '*', error: '*', ops: '*' },
      config: {
        token: 'TOKEN',
        subdomain: 'SUBDOMAIN',
        name: 'medicine',
        tags: ['medicine', 'nodejs']
      }
    }],
    $default: [{
      reporter: GoodConsole,
      events: { log: '*', response: '*', error: '*', info: '*', ops: '*' }
    }]
  }
})

const store = new Confidence.Store(master)
const criteria = {
  env: process.env.NODE_ENV
}

export default function (key) {
  return store.get(key, criteria)
}
