const express = require('express')
const cors = require('cors')
const app = express()

const Songs = require('./songs')
const Settings = require('./settings')

const port = 3000

app.use(cors())

app.use('/settings', Settings)
app.use('/songs', Songs)

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
