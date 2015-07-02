import {
    UPDATE_PAGE,
    UPDATE_PAGE_TOC,
    REMOVE_PAGE_TOC,
    SHOW_PAGE_TOC,
    PAGE_TOC_HAS_BACKGROUND,
    PAGE_TOC_IS_LOCKED
  } from '../constants'

import Immutable from 'immutable'

const defaultState = Immutable.Map({ //eslint-disable-line
  title: '',
  toc: null,
  tocIsOpen: false,
  tocHasBackdrop: false,
  tocIsLocked: false
})

export default function layout (state = defaultState, action) {

  switch (action.type) {

    case UPDATE_PAGE:
      return state.set('title', action.value)

    case UPDATE_PAGE_TOC:
      return state.set('toc', action.value)

    case SHOW_PAGE_TOC:
      return state.set('tocIsOpen', action.value)

    case PAGE_TOC_HAS_BACKGROUND:
      return state.set('tocHasBackdrop', action.value)

    case PAGE_TOC_IS_LOCKED:
      return state.set('tocIsLocked', action.value)

    case REMOVE_PAGE_TOC:
      return state.merge({
        toc: null,
        tocIsOpen: false,
        tocHasBackdrop: false
      })

    default:
      return state

  }

}
