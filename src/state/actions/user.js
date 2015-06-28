import { TEST_METHOD } from '../constants'

export function testMethod () {
  return (dispatch, getState, api) => {
    console.log(getState, api)
    dispatch({
      type: TEST_METHOD
    })
  }
}
