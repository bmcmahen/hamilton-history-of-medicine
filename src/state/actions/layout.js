import {
  UPDATE_PAGE,
  UPDATE_PAGE_TOC,
  REMOVE_PAGE_TOC
  } from '../constants'
import Immutable from 'immutable'

export function updatePage (title) {
  return {
    type: UPDATE_PAGE,
    value: title
  }
}

export function updateTOC (activeOption, options) {
  let update = {
    activeOption,
    options
  }

  return {
    type: UPDATE_PAGE_TOC,
    value: Immutable.fromJS(update)
  }
}

export function removeTOC () {
  return {
    type: REMOVE_PAGE_TOC
  }
}
