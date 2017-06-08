import { rootReducer } from '../store/reducers'
import App from './containers/app'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom'
import createStoreWithInitState from '../store/store'

const store = createStoreWithInitState({
  chars: window.__PRELOADED_STATE__.entities.chars,
  charsIndexList: window.__PRELOADED_STATE__.result,
})

delete window.__PRELOADED_STATE__ 

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('app')
)

