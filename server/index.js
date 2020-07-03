const express = require('express')
const cors = require('cors')
const app = express()
const path = require('path')
const fileSystem = require('fs')

const port = 3000

app.use(cors())
app.get('/track/:id', (req, res) => {
  const filePath = path.resolve(__dirname, './private', './ninja.mp3')
  const stat = fileSystem.statSync(filePath)

  res.writeHead(200, {
    'Content-Type': 'audio/mpeg',
    'Content-Length': stat.size
  })
  const readStream = fileSystem.createReadStream(filePath)
  readStream.pipe(res)
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
