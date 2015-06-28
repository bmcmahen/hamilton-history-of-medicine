import { Router } from 'react-router'
import routes from '../components/Routes'
import React from 'react'
import injectScript from './util/inject'
import {createRedux, createDispatcher, composeStores} from 'redux'
import * as stores from '../state/stores'
import thunkMiddleware from '../state/middleware/thunk'
import promiseMiddleware from '../state/middleware/promise'
import Root from '../components/Root'
import Location from 'react-router/lib/Location'
import Boom from 'boom'
import Helmet from 'react-helmet'
import api from './api'

const host = process.env.NODE_ENV === 'production'
  ? null
  : '//localhost:8080'

/**
 * Render our HTML template with react html & data
 * @param  {String} html
 * @return {Object}
 */

const defaultHead = {
  title: 'History of Medicine'
}

function renderTemplate (html, preloaded = {}, head = defaultHead) {
  let str = (
    `<!doctype html>
      <html lang="en-us">
        <head>
          <meta charset="utf-8">
          <title>${head.title}</title>
          <link rel="shortcut icon" href="/assets/favicon.ico">
          <script src="//use.typekit.net/znc4nio.js"></script>
          <script>try{Typekit.load();}catch(e){}</script>
          <script src='https://api.tiles.mapbox.com/mapbox-gl-js/v0.8.1/mapbox-gl.js'></script>
          <link href='https://api.tiles.mapbox.com/mapbox-gl-js/v0.8.1/mapbox-gl.css' rel='stylesheet' />
        </head>
        <body>
          <div id="react-root">${html}</div>
        </body>
      </html>`
  )
  return injectScript(str, preloaded, [`${host}/client.js`])
}

/**
 * Render our react routes on the server
 * @param  {String}   path
 * @param  {String}   query
 * @param  {Function} fn
 */

export default function renderServer (request, reply) {
  const {query, path} = request

  const dispatcher = createDispatcher(
    composeStores(stores),
    getState => [ thunkMiddleware(getState, api), promiseMiddleware(api) ]
  )

  const sessionData = {}
  const redux = createRedux(dispatcher, sessionData)
  const currentRoutes = routes(redux)
  const location = new Location(path, query)

  Router.run(currentRoutes, location, (err, routerState, transition) => {
    if (err) {
      return reply(Boom.wrap(err))
    }

    if (transition.isCancelled) {
      // todo: include this as a queryparam
      // let redirectPath = transition.state && (transition.state.nextPathname || '/user')
      let nextPath = transition.redirectInfo.pathname
      return reply.redirect(nextPath)
    }

    // call any promise contained within a static fetchData method
    Promise.all(routerState.components
      .filter(component => component.fetchData)
      .map(component => {
        return component.fetchData(redux)
      }))
      .then(() => {
        let stateToTransfer = redux.getState()
        let html = React.renderToString(
          <Root
            routerProps={routerState}
            redux={redux}
          />
        )
        let head = Helmet.rewind()
        return reply(renderTemplate(html, stateToTransfer, head))
      })
      .catch(error => {
        return reply(Boom.wrap(error))
      })


  })
}
