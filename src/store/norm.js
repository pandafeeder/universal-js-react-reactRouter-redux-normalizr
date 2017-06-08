import { normalize } from 'normalizr'
import * as schema from './schema'
import util from 'util'
import fetch from 'isomorphic-fetch'

const url_all = "http://localhost:3000/api"
const url_one = "http://localhost:3000/api/char/a"


const request = () => {
  return url => {
    return schema => {
      fetch(url)
        .then(response => {
          if (response.status >= 400) {
            throw new Error('failed')
          }
          return response.json()
        })
        .then(json => {
          const data = normalize(json, schema)
          console.log(util.inspect(data, {depth: null}))
        })
        .catch(e => {
          console.log(e)
        })
    }
  }
}

//request()(url_all)(schema.charListSchema)
//request()(url_one)(schema.charSchema)