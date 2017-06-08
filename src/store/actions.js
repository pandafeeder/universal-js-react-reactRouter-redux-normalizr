import * as schema from './schema'
import { normalize } from 'normalizr'
import fetch from 'isomorphic-fetch'

export const GET_ALL_START = 'GET_ALL_START'
export const GET_ALL_OK = 'GET_ALL_OK'
export const GET_ALL_FAILED = 'GET_ALL_FAILED'
export const GET_CHAR_START = 'GET_CHAR_START'
export const GET_CHAR_OK = 'GET_CHAR_OK'
export const GET_CHAR_FAILED = 'GET_CHAR_FAILED'

// shape of a char
//{
//  pron: '',
//  hira: '',
//  kata: '',
//}

const get_all_start = () => ({
  type: GET_ALL_START,
})
const get_all_ok = (normResponse) => ({
  type: GET_ALL_OK,
  data: normResponse
})
const get_all_failed = () => ({
  type: GET_ALL_FAILED,
})

export const get_all = (url) => {
  return dispatch => {
    dispatch(get_all_start())
    fetch(url)
      .then(response => {
        if (response.status >= 400) {
          throw new Error()
        }
        return response.json()
      })
      .then(json => {
        dispatch(get_all_ok(normalize(json, schema.charListSchema)))
      })
      .catch(e => {
        dispatch(get_all_failed())
      })
  }
}
