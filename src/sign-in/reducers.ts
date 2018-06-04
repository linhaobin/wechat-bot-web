import { combineReducers, Reducer } from 'redux'
// import { handleActions } from 'redux-actions'
import { ActionTypes } from './actions'
// import { StoreState } from '../store'

// inProgress
// const inProgress1 = handleActions(
//   {
//     [ActionTypes.SIGNIN_INPROGRESS]() {
//       return true
//     }
// [combineActions(ActionTypes.SIGNIN_SUCCESS, ActionTypes.SIGNIN_FAIL)]() {
// return false
// }
//   },
//   false
// )

const inProgress: Reducer<boolean> = (state = false, action) => {
  switch (action.typ) {
    case ActionTypes.SIGNIN_INPROGRESS:
      return true
    case ActionTypes.SIGNIN_SUCCESS:
    case ActionTypes.SIGNIN_FAIL:
      return false
    default:
      return state
  }
}

export default combineReducers({
  inProgress
})
