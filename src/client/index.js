import React from 'react'
import BrowserHistory from 'react-router/lib/BrowserHistory'
import Root from '../components/Root'
import { createRedux, createDispatcher, composeStores } from 'redux'
import thunkMiddleware from '../state/middleware/thunk'
import promiseMiddleware from '../state/middleware/promise'
import api from './api'
import * as stores from '../state/stores'
import immutable from 'immutable'
import _ from 'lodash'
import debug from 'debug'

const log = debug('app:boot')

// Instantiate our clientside specifics
const history = new BrowserHistory()
const preloaded = window.__reactTransmitPacket || {}
const preloadedImmutable = {}

// convert our transferred objects to immutable data structures
_.each(preloaded, (val, key) => {
  preloadedImmutable[key] = immutable.fromJS(val)
})

log('preloading with immutable data %o', preloadedImmutable)

const dispatcher = createDispatcher(
  composeStores(stores),
  getState => [ thunkMiddleware(getState, api), promiseMiddleware() ]
)
const redux = createRedux(dispatcher, preloadedImmutable)
const routerProps = { history }

// Render our App
React.render(
  <Root redux={redux} routerProps={routerProps} />,
  document.getElementById('react-root')
)
