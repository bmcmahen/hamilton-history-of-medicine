import _ from 'lodash'

export default function promiseMiddleware (getState, api) {
  return next =>
    function _r (action) {
      if (action && _.isFunction(action.then)) {
        return action.then(_r)
      }

      if (_.isFunction(action)) {
        return _r(action(api, getState))
      }

      return next(action)
    }
}

//
// /**
//  * Handle Promises
//  */
//
// export default function promiseMiddleware () {
//   return (next) => {
//     const recurse = (action) => {
//       if (action && action.promise) {
//         let {promise, types, ...args} = action
//         let [REQUEST, SUCCESS, FAILURE] = types
//         next({ ...args, type: REQUEST })
//         return action.promise.then(
//           (result) => {
//             let doc = { result, ...args, type: SUCCESS }
//             next(doc)
//             return doc
//           },
//           (error) => {
//             let doc = { error, ...args, type: FAILURE }
//             next(doc)
//             return doc
//           }
//         )
//       }
//       return next(action)
//     }
//     return recurse
//   }
// }
