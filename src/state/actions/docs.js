import { LOAD_DOC, LOADED_DOC } from '../constants'

// fake api data
const docs = {
  'a': {
    title: 'University Hospital',
    content: 'Hello world'
  },
  'b': {
    title: 'Downtown Hospital',
    content: 'Hello world'
  },
  'c': {
    title: 'St. Mary Hospital',
    content: 'Hello world'
  },
  d: {
    title: 'University Hospital',
    content: 'Hello world'
  },
  e: {
    title: 'Downtown Hospital',
    content: 'Hello world'
  },
  f: {
    title: 'St. Mary Hospital',
    content: 'Hello world'
  }
}

export function loadDoc (id) {
  return (dispatch, getState, api) => {

    return new Promise((resolve) => {
      dispatch({
        type: LOAD_DOC,
        id: id
      })

      setTimeout(() => {
        let doc = docs[id]
        dispatch({
          type: LOADED_DOC,
          id: id,
          doc: doc
        })
        resolve(doc)
      }, 500)
    })
  }
}
