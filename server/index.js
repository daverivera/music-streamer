const express = require('express')
const app = express()
const path = require('path')
const fileSystem = require('fs')

const port = 3000

app.get('/track', (req, res) => {
  // generate file path
  const filePath = path.resolve(__dirname, './private', './ninja.mp3')
  // get file size info
  const stat = fileSystem.statSync(filePath)

  // set response header info
  res.writeHead(200, {
    'Content-Type': 'audio/mpeg',
    'Content-Length': stat.size
  })
  //create read stream
  const readStream = fileSystem.createReadStream(filePath)
  // attach this stream with response stream
  readStream.pipe(res)
})

app.use(express.static(path.resolve(__dirname, 'src/my-app/build')))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
