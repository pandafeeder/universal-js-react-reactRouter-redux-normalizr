import { createStore, applyMiddleware } from 'redux'
import { rootReducer } from './reducers'
import thunkMiddleware from 'redux-thunk'
import { logger } from 'redux-logger'


const rootStore = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware
  ),
)

export default function createStoreWithInitState(initState) {
  const rootStore = createStore(
    rootReducer,
    initState,
    applyMiddleware(
      logger,
      thunkMiddleware,
    )    
  )
  return rootStore
}

