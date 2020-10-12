const express = require('express')
const helmet = require('helmet')

const app = express()

// app.use(helmet())
app.use(express.static('public'))

const port = 3003
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})
