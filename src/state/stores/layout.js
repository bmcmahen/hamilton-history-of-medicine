import {
    UPDATE_PAGE,
    UPDATE_PAGE_TOC,
    REMOVE_PAGE_TOC
  } from '../constants'
import Immutable from 'immutable'

const defaultState = Immutable.Map({ //eslint-disable-line
  title: '',
  toc: null
})

export default function layout (state = defaultState, action) {

  switch (action.type) {

    case UPDATE_PAGE:
      return state.set('title', action.value)

    case UPDATE_PAGE_TOC:
      return state.set('toc', action.value)

    case REMOVE_PAGE_TOC:
      return state.set('toc', null)

    default:
      return state

  }

}
