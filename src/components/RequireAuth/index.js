/**
 * Simply require that the user is authenticated
 * @param  {Redux} redux
 * @return {Function}
 */

export default function requireAuth (redux) {
  return (nextState, transition) => {
    let appState = redux.getState()
    if (!appState.user) {
      transition.to('/', null, {
        nextPathname: nextState.location.pathname
      })
    }
  }
}


// for handling subsequent login,
// see: https://github.com/rackt/react-router/blob/master/examples/auth-flow/app.js
