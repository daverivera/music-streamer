const express = require('express')
const path = require('path')
const fileSystem = require('fs')

const Router = express.Router()

Router.get('/:name', (req, res) => {
  const filePath = path.resolve('/Users/daverivera/Music', req.params.name)
  const stat = fileSystem.statSync(filePath)

  res.writeHead(200, {
    'Content-Type': 'audio/mpeg',
    'Content-Length': stat.size
  })
  const readStream = fileSystem.createReadStream(filePath)
  readStream.pipe(res)
})

module.exports = Router
