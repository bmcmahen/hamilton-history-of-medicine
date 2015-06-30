import { UPDATE_PAGE, UPDATE_PAGE_TOC } from '../constants'
import Immutable from 'immutable'

const defaultState = Immutable.Map({ //eslint-disable-line
  title: '',
  toc: null
})

export default function layout (state = defaultState, action) {

  console.log('calling action for layout', state, action)

  switch (action.type) {

    // case '@@INIT':
    //   return immutable.fromJS()

    case UPDATE_PAGE:
      return state.set('title', action.value)

    case UPDATE_PAGE_TOC:
      return state.set('toc', action.value)

    default:
      return state

  }

}
