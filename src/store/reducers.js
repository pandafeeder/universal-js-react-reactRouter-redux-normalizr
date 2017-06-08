import { GET_ALL_OK, GET_CHAR_OK } from './actions'
import { combineReducers } from 'redux'

// shape
// {
//   entities: {
//     chars: {1: {}, 2:{}, 3:{}}
//   },
//   result: [1,2,3]
// }


// singleChar Reducer
const chars = (state={}, action) => {
  switch (action.type) {
    case GET_ALL_OK:
      return (
        {...state, ...action.data.entities.chars}
      )
    case GET_CHAR_OK:
      return (
        {...state, ...action.data.entities.chars}
      )
    default:
      return state
  }
}

// char list reducer
const charsIndexList = (state=[], action) => {
  switch (action.type) {
    case GET_ALL_OK:
      return [...action.data.result]
    case GET_CHAR_OK:
      return [...state, ...action.data.result]
    default:
      return state
  }
}

// rootReducer
export const rootReducer = combineReducers({
  chars,
  charsIndexList,
})
