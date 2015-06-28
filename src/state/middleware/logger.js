import debug from 'debug'

const log = debug('app:logger')

export default function loggerMiddleware (next) {
  return action => {
    log('action %o', action)
    next(action)
  }
}
