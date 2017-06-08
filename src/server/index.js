import express from 'express'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { normalize } from 'normalizr'
import * as schema from '../store/schema'
import { Provider } from 'react-redux'
import App from '../client/containers/app'
import {
  StaticRouter as Router,
} from 'react-router-dom'
import createStoreWithInitState from '../store/store'

const app = express()
app.use('/static', express.static('./static'))

app.get('*', (req, res) => {
  const apiData = [
    {
      id: 1,
      pron: 'a',
      hira: 'a-h',
      kata: 'a-k'
    },
    {
      id: 2,
      pron: 'i',
      hira: 'i-h',
      kata: 'i-k'
    }
  ]

  const preloadStore = normalize(apiData, schema.charListSchema)
  const store = createStoreWithInitState(
    {
      chars: preloadStore.entities.chars,
      charsIndexList: preloadStore.result,
    }
  )
  const context = {}
  const reactApp =  ReactDOMServer.renderToString(
      <Provider store={store}>
        <Router context={context} location={req.url}>
          <App />
        </Router>
      </Provider>
  )
  if (context.url) {
    res.redirect(context.url)
  } else {
    if (context.status) {
      res.status(context.status).send(
        htmlTemplate(reactApp, preloadStore)
      )
    } else {
      res.send(
        htmlTemplate(reactApp, preloadStore)
      )
    }
  }
})

function htmlTemplate(reactApp, preloadStore) {
  return(
`
<!doctype html>
<html>
  <head>
    <title>React Universal Example</title>
  </head>
  <body>
    <div id="app">${reactApp}</div>
    <script>
       window.__PRELOADED_STATE__ = ${JSON.stringify(preloadStore).replace(/</g, '\\u003c')}
    </script>
    <script src="/static/client_entry.js"></script>
  </body>
</html>
`
  )
}

app.get('/api', (req, res) => {
  res.send(
  [
    {
      id: 1,
      pron: 'a',
      hira: 'a-h',
      kata: 'a-k'
    },
    {
      id: 2,
      pron: 'i',
      hira: 'i-h',
      kata: 'i-k'
    }
  ]
  )
})

app.listen(4000)
