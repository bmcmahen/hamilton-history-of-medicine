import { UPDATE_PAGE, UPDATE_PAGE_TOC } from '../constants'

export function updatePage (title) {
  return {
    type: UPDATE_PAGE,
    value: title
  }
}

export function updateTOC (toc) {
  return {
    type: UPDATE_PAGE_TOC,
    value: toc
  }
}
