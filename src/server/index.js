import {Server} from 'hapi'
import Boom from 'boom'
import config from './config'
import Good from 'good'
import uiRender from './ui-render'

const server = new Server()

server.connection({
  host: config('/http/host'),
  port: config('/http/port')
})

/**
 * Static content hosting
 * - All of this should eventually be on s3
 */

server.route({
  method: 'get',
  path: '/assets/{path*}',
  handler: {
    directory: {
      path: './static',
      listing: true,
      index: true
    }
  }
})

/**
 * Render our clientside app
 */

server.route({
  method: 'get',
  path: '/{params*}',
  handler: (request, reply) => {

    // only respond to text/html requests
    let type = request.headers.accept
    if (type && !~type.indexOf('text/html')) {
      return reply(Boom.notFound())
    }

    let {path, query} = request
    uiRender(request, reply)
  }
})

/**
 * Register Plugins
 */

server.register([
  {
    register: Good,
    options: {
      opsInterval: 60000,
      reporters: config('/logger')
    }
  }
], err => {

  if (err) {
    throw err
  }

  // start running our server
  server.start(() => {
    server.log('Server running')
  })
})
