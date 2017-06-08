//import express from 'express'
const express = require('express')

const app = express()

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

app.get('/api/char/a', (req, res) => {
  res.send(
  {
    id: 1,
    pron: 'a',
    hira: 'a-h',
    kata: 'a-k'
  }
  )
})

app.listen(3000)
