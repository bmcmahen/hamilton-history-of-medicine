import {
  UPDATE_PAGE,
  UPDATE_PAGE_TOC,
  REMOVE_PAGE_TOC,
  SHOW_PAGE_TOC,
  PAGE_TOC_HAS_BACKGROUND,
  PAGE_TOC_IS_LOCKED
  } from '../constants'
import Immutable from 'immutable'

export function updatePage (title) {
  return {
    type: UPDATE_PAGE,
    value: title
  }
}

export function updateTOC (options) {
  let update = {
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

export function showTOC (toShow) {
  return {
    type: SHOW_PAGE_TOC,
    value: toShow
  }
}

export function showTOCBackdrop (toShow) {
  return {
    type: PAGE_TOC_HAS_BACKGROUND,
    value: toShow
  }
}

export function lockTOC (toLock) {
  return {
    type: PAGE_TOC_IS_LOCKED,
    value: toLock
  }
}
