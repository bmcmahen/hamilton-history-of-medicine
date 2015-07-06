import {
  LOAD_DOC,
  LOADED_DOC
} from '../constants'
import Immutable from 'immutable'
import debug from 'debug'

const log = debug('app:stores:docs')

const defaultState = Immutable.Map()

export default function docs (state = defaultState, action) {

  log('action %o, state: %o', action, state.toJS())

  switch (action.type) {

    case LOAD_DOC:
      return state.mergeDeep(Immutable.fromJS({ [action.id]: { loading: true }}))

    case LOADED_DOC:
      action.doc.loading = false
      return state.mergeDeep(Immutable.fromJS({ [action.id]: action.doc }))

    default:
      return state
  }
}
